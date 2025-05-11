import pandas as pd
import numpy as np
from datetime import datetime
import re
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.linear_model import LogisticRegression, LinearRegression
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.metrics import accuracy_score, classification_report, mean_squared_error, r2_score
import joblib
import matplotlib.pyplot as plt
import seaborn as sns

class StartupFundingModel:
    def __init__(self):
        self.data = None
        self.model = None
        self.preprocessor = None
        self.X_train = None
        self.X_test = None
        self.y_train = None
        self.y_test = None
        
    def load_data(self, filepath):
        """Load the startup funding dataset"""
        self.data = pd.read_csv(filepath)
        print(f"Data loaded with shape: {self.data.shape}")
        return self.data
        
    def clean_data(self):
        """Clean the dataset by handling missing values and converting formats"""
        # Make a copy of the data to avoid modifying the original
        df = self.data.copy()
        
        # Rename columns for ease of use (optional based on your CSV structure)
        df.columns = [col.strip() for col in df.columns]
        
        # Handle missing values
        df = df.fillna({
            'Investors Name': 'Unknown',
            'Remarks': 'No Remarks',
            'SubVertical': 'General'
        })
        
        # Clean amount data - remove commas and convert to float
        def clean_amount(amount):
            if pd.isna(amount) or amount == 'N/A' or amount == 'undisclosed' or amount == 'nan' or amount == 'unknown' or amount == 'Undisclosed':
                return np.nan
            try:
                # Remove commas and convert to float
                if isinstance(amount, str):
                    return float(amount.replace(',', ''))
                return float(amount)
            except:
                return np.nan
            
        # Apply amount cleaning
        if 'Amount in USD' in df.columns:
            df['Amount_Cleaned'] = df['Amount in USD'].apply(clean_amount)
            # Fill missing values with median
            median_amount = df['Amount_Cleaned'].median()
            df['Amount_Cleaned'] = df['Amount_Cleaned'].fillna(median_amount)
            
        # Convert date to a standard format
        def parse_date(date_str):
            if pd.isna(date_str):
                return None
            try:
                # Assuming dd/mm/yyyy format
                return datetime.strptime(date_str, '%d/%m/%Y')
            except:
                try:
                    # Try alternative format
                    return datetime.strptime(date_str, '%d/%m/%y')
                except:
                    return None
                
        if 'Date dd/mm/yyyy' in df.columns:
            df['Parsed_Date'] = df['Date dd/mm/yyyy'].apply(parse_date)
            # Extract year and month as features
            df['Year'] = df['Parsed_Date'].apply(lambda x: x.year if x else 2017)  # Default to a common year
            df['Month'] = df['Parsed_Date'].apply(lambda x: x.month if x else 6)    # Default to middle of year
            
        # Extract the city from 'City Location'
        if 'City  Location' in df.columns:
            df['City'] = df['City  Location'].apply(lambda x: str(x).split(',')[0] if pd.notna(x) else 'Unknown')
        
        self.data = df
        return df
        
    def feature_engineering(self):
        """Create new features from existing ones"""
        df = self.data.copy()
        
        # Categorize funding types
        funding_categories = {
            'Seed': ['Seed', 'Angel', 'seed'],
            'Series A': ['Series A'],
            'Series B': ['Series B'],
            'Series C': ['Series C'],
            'Series D+': ['Series D', 'Series E', 'Series F', 'Series G', 'Series H'],
            'Private Equity': ['Private Equity', 'private equity', 'Private equity'],
            'Debt Funding': ['Debt', 'debt'],
            'Other': []
        }
        
        def categorize_funding(funding_type):
            if pd.isna(funding_type):
                return 'Other'
            funding_type = str(funding_type)
            for category, keywords in funding_categories.items():
                if any(keyword.lower() in funding_type.lower() for keyword in keywords):
                    return category
            return 'Other'
        
        if 'InvestmentnType' in df.columns:
            df['Funding_Category'] = df['InvestmentnType'].apply(categorize_funding)
        
        # Group industries into broader categories
        industry_categories = {
            'Technology': ['Technology', 'IT', 'SaaS', 'IoT', 'AI', 'Tech'],
            'E-Commerce': ['E-Commerce', 'eCommerce', 'E-commerce', 'ECommerce'],
            'Consumer Internet': ['Consumer Internet'],
            'Healthcare': ['Healthcare', 'Health', 'Medical'],
            'Finance': ['Finance', 'FinTech', 'Fin-Tech'],
            'Education': ['Education', 'Ed-Tech', 'EdTech'],
            'Logistics': ['Logistics', 'Supply Chain'],
            'Food & Beverage': ['Food', 'Beverage'],
            'Other': []
        }
        
        def categorize_industry(industry):
            if pd.isna(industry):
                return 'Other'
            industry = str(industry)
            for category, keywords in industry_categories.items():
                if any(keyword.lower() in industry.lower() for keyword in keywords):
                    return category
            return 'Other'
        
        if 'Industry Vertical' in df.columns:
            df['Industry_Category'] = df['Industry Vertical'].apply(categorize_industry)
        
        # Group top locations and mark others as 'Other'
        if 'City' in df.columns:
            # Get the top 10 cities by frequency
            top_cities = df['City'].value_counts().head(10).index.tolist()
            df['Location_Category'] = df['City'].apply(lambda x: x if x in top_cities else 'Other')
        
        # Create a feature for multiple investors
        if 'Investors Name' in df.columns:
            df['Multiple_Investors'] = df['Investors Name'].apply(
                lambda x: 1 if pd.notna(x) and (',' in str(x) or '&' in str(x)) else 0
            )
        
        # Create funding size category
        if 'Amount_Cleaned' in df.columns:
            def categorize_amount(amount):
                if amount <= 100000:
                    return 'Small (<$100K)'
                elif amount <= 1000000:
                    return 'Medium ($100K-$1M)'
                elif amount <= 10000000:
                    return 'Large ($1M-$10M)'
                else:
                    return 'Very Large (>$10M)'
            
            df['Funding_Size'] = df['Amount_Cleaned'].apply(categorize_amount)
            
        self.data = df
        return df
    
    def preprocess_data(self, target_type='regression', target_col='Amount_Cleaned'):
        """Preprocess the data for model training"""
        # Clean and feature engineer the data
        self.clean_data()
        df = self.feature_engineering()
        
        # Make sure necessary columns exist
        if target_col not in df.columns:
            raise ValueError(f"Target column '{target_col}' not found in dataset")
        
        # Ensure no NaN values in the target variable
        if target_col == 'Amount_Cleaned' and df[target_col].isna().any():
            print(f"Filling NaN values in target column '{target_col}' with median")
            median_value = df[target_col].median()
            df[target_col] = df[target_col].fillna(median_value)
        
        # Define features and target
        if target_type == 'regression':
            # For amount prediction
            y = df[target_col]
            # Features to use
            feature_cols = ['Year', 'Month', 'Multiple_Investors', 'Industry_Category', 
                           'Location_Category', 'Funding_Category']
        else:
            # For classification (e.g., predicting funding category)
            y = df[target_col]
            # Features to use
            feature_cols = ['Year', 'Month', 'Multiple_Investors', 'Industry_Category', 
                           'Location_Category', 'Amount_Cleaned'] if target_col != 'Funding_Category' else \
                           ['Year', 'Month', 'Multiple_Investors', 'Industry_Category', 
                            'Location_Category', 'Amount_Cleaned']
        
        # Check if all feature columns exist
        missing_cols = [col for col in feature_cols if col not in df.columns]
        if missing_cols:
            raise ValueError(f"Missing columns in dataset: {missing_cols}")
        
        # Keep only required columns
        X = df[feature_cols]
        
        # Fill NaN values in features
        for col in X.columns:
            if X[col].isna().any():
                if X[col].dtype.kind in 'ifc':  # integer, float, complex
                    # Fill numeric columns with median
                    X[col] = X[col].fillna(X[col].median())
                    print(f"Filled NaN values in '{col}' with median")
                else:
                    # Fill categorical columns with most frequent value
                    X[col] = X[col].fillna(X[col].mode()[0])
                    print(f"Filled NaN values in '{col}' with most frequent value")
        
        # Split data
        self.X_train, self.X_test, self.y_train, self.y_test = train_test_split(
            X, y, test_size=0.2, random_state=42
        )
        
        # Define preprocessing for numerical and categorical features
        numeric_features = ['Year', 'Month']
        if 'Multiple_Investors' in X.columns:
            numeric_features.append('Multiple_Investors')
        if 'Amount_Cleaned' in X.columns and target_col != 'Amount_Cleaned':
            numeric_features.append('Amount_Cleaned')
            
        categorical_features = [col for col in X.columns if col not in numeric_features]
        
        numeric_transformer = Pipeline(steps=[
            ('scaler', StandardScaler())
        ])
        
        categorical_transformer = Pipeline(steps=[
            ('onehot', OneHotEncoder(handle_unknown='ignore'))
        ])
        
        self.preprocessor = ColumnTransformer(
            transformers=[
                ('num', numeric_transformer, numeric_features),
                ('cat', categorical_transformer, categorical_features)
            ])
        
        # Preprocess training data
        self.X_train_transformed = self.preprocessor.fit_transform(self.X_train)
        self.X_test_transformed = self.preprocessor.transform(self.X_test)
        
        return self.X_train_transformed, self.X_test_transformed, self.y_train, self.y_test
    
    def train_model(self, model_type='random_forest', task='regression'):
        """Train the ML model"""
        if task == 'regression':
            if model_type == 'random_forest':
                self.model = RandomForestRegressor(n_estimators=100, random_state=42)
            elif model_type == 'linear_regression':
                self.model = LinearRegression()
            else:
                raise ValueError("Unsupported model type for regression")
        else:  # classification
            if model_type == 'random_forest':
                self.model = RandomForestClassifier(n_estimators=100, random_state=42)
            elif model_type == 'logistic_regression':
                self.model = LogisticRegression(max_iter=1000, random_state=42)
            else:
                raise ValueError("Unsupported model type for classification")
            
        self.model.fit(self.X_train_transformed, self.y_train)
        return self.model
    
    def evaluate_model(self, task='regression'):
        """Evaluate the model performance"""
        y_pred = self.model.predict(self.X_test_transformed)
        
        if task == 'regression':
            mse = mean_squared_error(self.y_test, y_pred)
            rmse = np.sqrt(mse)
            r2 = r2_score(self.y_test, y_pred)
            
            print(f"Model Performance Metrics:")
            print(f"Mean Squared Error: {mse:.4f}")
            print(f"Root Mean Squared Error: {rmse:.4f}")
            print(f"R² Score: {r2:.4f}")
            
            return mse, rmse, r2
        else:  # classification
            accuracy = accuracy_score(self.y_test, y_pred)
            report = classification_report(self.y_test, y_pred)
            
            print(f"Model Accuracy: {accuracy:.4f}")
            print("Classification Report:")
            print(report)
            
            return accuracy, report
    
    def save_model(self, model_path, preprocessor_path):
        """Save the trained model and preprocessor"""
        joblib.dump(self.model, model_path)
        joblib.dump(self.preprocessor, preprocessor_path)
        print(f"Model saved to {model_path}")
        print(f"Preprocessor saved to {preprocessor_path}")
    
    def load_model(self, model_path, preprocessor_path):
        """Load a trained model and preprocessor"""
        self.model = joblib.load(model_path)
        self.preprocessor = joblib.load(preprocessor_path)
        print("Model and preprocessor loaded successfully")
    
    def predict(self, input_data):
        """Make predictions with the trained model"""
        # Preprocess the input data
        processed_data = self.preprocessor.transform(input_data)
        
        # Make predictions
        predictions = self.model.predict(processed_data)
        
        return predictions
    
    def feature_importance(self):
        """Display feature importance for tree-based models"""
        if hasattr(self.model, 'feature_importances_'):
            # Get feature names after one-hot encoding
            feature_names = []
            for name, transformer, features in self.preprocessor.transformers_:
                if name == 'cat':
                    # For categorical features, get all the one-hot encoded feature names
                    for i, feature in enumerate(features):
                        categories = transformer.named_steps['onehot'].categories_[i]
                        for category in categories:
                            feature_names.append(f"{feature}_{category}")
                else:
                    # For numeric features, just use the feature name
                    feature_names.extend(features)
            
            # Get feature importance
            importances = self.model.feature_importances_
            
            # Sort features by importance
            indices = np.argsort(importances)[::-1]
            
            plt.figure(figsize=(12, 8))
            plt.title('Feature Importances')
            plt.bar(range(len(importances)), importances[indices])
            plt.xticks(range(len(importances)), [feature_names[i] if i < len(feature_names) else f"Feature_{i}" for i in indices], rotation=90)
            plt.tight_layout()
            plt.savefig('feature_importance.png')
            plt.close()
            
            # Return sorted feature importance as a dictionary
            return {feature_names[i] if i < len(feature_names) else f"Feature_{i}": importances[i] for i in indices}
        else:
            print("This model doesn't support feature importance")
            return None
    
    def visualize_data(self):
        """Create basic visualizations from the data"""
        df = self.data
        
        if not os.path.exists('visualizations'):
            os.makedirs('visualizations')
        
        # Funding by Industry
        plt.figure(figsize=(12, 8))
        industry_funding = df.groupby('Industry_Category')['Amount_Cleaned'].sum().sort_values(ascending=False)
        sns.barplot(x=industry_funding.index, y=industry_funding.values)
        plt.title('Total Funding by Industry')
        plt.xlabel('Industry')
        plt.ylabel('Total Funding (USD)')
        plt.xticks(rotation=45)
        plt.tight_layout()
        plt.savefig('visualizations/industry_funding.png')
        plt.close()
        
        # Funding by Location
        plt.figure(figsize=(12, 8))
        location_funding = df.groupby('Location_Category')['Amount_Cleaned'].sum().sort_values(ascending=False)
        sns.barplot(x=location_funding.index, y=location_funding.values)
        plt.title('Total Funding by Location')
        plt.xlabel('Location')
        plt.ylabel('Total Funding (USD)')
        plt.xticks(rotation=45)
        plt.tight_layout()
        plt.savefig('visualizations/location_funding.png')
        plt.close()
        
        # Funding by Year
        plt.figure(figsize=(10, 6))
        year_funding = df.groupby('Year')['Amount_Cleaned'].sum()
        sns.lineplot(x=year_funding.index, y=year_funding.values)
        plt.title('Total Funding by Year')
        plt.xlabel('Year')
        plt.ylabel('Total Funding (USD)')
        plt.tight_layout()
        plt.savefig('visualizations/year_funding.png')
        plt.close()
        
        # Number of Deals by Month
        plt.figure(figsize=(10, 6))
        month_counts = df['Month'].value_counts().sort_index()
        sns.barplot(x=month_counts.index, y=month_counts.values)
        plt.title('Number of Deals by Month')
        plt.xlabel('Month')
        plt.ylabel('Number of Deals')
        plt.tight_layout()
        plt.savefig('visualizations/month_deals.png')
        plt.close()
        
        # Funding Type Distribution
        plt.figure(figsize=(10, 6))
        funding_type_counts = df['Funding_Category'].value_counts()
        sns.barplot(x=funding_type_counts.index, y=funding_type_counts.values)
        plt.title('Distribution of Funding Types')
        plt.xlabel('Funding Type')
        plt.ylabel('Number of Deals')
        plt.xticks(rotation=45)
        plt.tight_layout()
        plt.savefig('visualizations/funding_type_distribution.png')
        plt.close()
        
        print("Visualizations saved to 'visualizations' folder")


# Usage example
if __name__ == "__main__":
    import os
    
    # Initialize the model
    model = StartupFundingModel()
    
    # Create directories if they don't exist
    if not os.path.exists('models'):
        os.makedirs('models')
    if not os.path.exists('visualizations'):
        os.makedirs('visualizations')
    
    # Load and preprocess data
    data = model.load_data('datasets/startup_funding.csv')
    
    # Clean data for initial analysis
    model.clean_data()
    model.feature_engineering()
    model.visualize_data()
    
    # For amount prediction (regression)
    print("\n=== Training Regression Model for Amount Prediction ===")
    X_train, X_test, y_train, y_test = model.preprocess_data(target_type='regression', target_col='Amount_Cleaned')
    trained_model = model.train_model(model_type='random_forest', task='regression')
    metrics = model.evaluate_model(task='regression')
    feature_imp = model.feature_importance()
    model.save_model('models/funding_amount_prediction_model.pkl', 'models/funding_amount_preprocessor.pkl')
    
    # For funding category prediction (classification)
    print("\n=== Training Classification Model for Funding Category Prediction ===")
    X_train, X_test, y_train, y_test = model.preprocess_data(target_type='classification', target_col='Funding_Category')
    trained_model = model.train_model(model_type='random_forest', task='classification')
    metrics = model.evaluate_model(task='classification')
    feature_imp = model.feature_importance()
    model.save_model('models/funding_category_model.pkl', 'models/funding_category_preprocessor.pkl')
    
    print("\nModels have been trained and saved. You can now use them for predictions!")
    
    # Example prediction for a new startup
    # sample_data = pd.DataFrame([{
    #     'Year': 2023,
    #     'Month': 6,
    #     'Multiple_Investors': 1,
    #     'Industry_Category': 'Technology',
    #     'Location_Category': 'Bangalore',
    #     'Funding_Category': 'Seed'
    # }])
    # model.load_model('models/funding_amount_prediction_model.pkl', 'models/funding_amount_preprocessor.pkl')
    # prediction = model.predict(sample_data)
    # print(f"Predicted funding amount: ${prediction[0]:,.2f}")