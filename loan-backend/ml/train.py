import pickle

import pandas as pd
from sklearn import metrics
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.preprocessing import StandardScaler

data = pd.read_csv('../dataset/train.csv')


# fill missing columns with default values
def fill_missing_values():
    data.Gender = data.Gender.fillna('Male')
    data.Married = data.Married.fillna('Yes')
    data.Dependents = data.Dependents.fillna('0')
    data.Self_Employed = data.Self_Employed.fillna('No')
    data.LoanAmount = data.LoanAmount.fillna(data.LoanAmount.mean())
    data.Loan_Amount_Term = data.Loan_Amount_Term.fillna(360.0)
    data.Credit_History = data.Credit_History.fillna(1.0)


def split_data():
    X = data.iloc[:, 1: 12].values
    y = data.iloc[:, 12].values
    return train_test_split(X, y, test_size=1 / 3, random_state=0)


def encode_data(X_train, y_train):
    labelencoder_X = LabelEncoder()
    for i in range(0, 5):
        X_train[:, i] = labelencoder_X.fit_transform(X_train[:, i])

    X_train[:, 10] = labelencoder_X.fit_transform(X_train[:, 10])

    labelencoder_y = LabelEncoder()
    y_train = labelencoder_y.fit_transform(y_train)
    return X_train, y_train


if __name__ == '__main__':
    fill_missing_values()
    X_train, X_test, y_train, y_test = split_data()
    X_train, y_train = encode_data(X_train, y_train)
    X_test, y_test = encode_data(X_test, y_test)

    # Feature scaling
    sc = StandardScaler()
    X_train = sc.fit_transform(X_train)
    X_test = sc.fit_transform(X_test)

    # Fitting logistic regression to the training set
    classifier = LogisticRegression(random_state=0)
    classifier.fit(X_train, y_train)

    y_pred = classifier.predict(X_test)
    print(y_pred)

    # Measuring accuracy
    print(f'The accuracy is: {metrics.accuracy_score(y_pred, y_test) * 100.0}%')

    # Saving model to file
    print('...Saving Model to File')
    pickle.dump(classifier, open('../dataset/model.pt', 'wb'))
