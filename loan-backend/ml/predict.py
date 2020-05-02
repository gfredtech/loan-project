import pickle
from datetime import datetime

import pandas as pd
from sklearn.preprocessing import LabelEncoder, StandardScaler

from models import Entries


def load_model():
    model = pickle.load(open('dataset/model.pt', 'rb'))
    return model


def predict(entry: Entries):
    married = 'Yes' if entry.maritalStatus == 'Married' else 'No'
    education = 'Graduate' if entry.education == 'Graduate' else 'Not Graduate'
    self_employed = 'Yes' if entry.isSelfEmployed else 'No'
    d = {'Gender': [entry.gender],
         'Married': [married],
         'Dependents': [str(entry.numberOfDependents)],
         'Education': [education],
         'Self_Employed': [self_employed],
         'ApplicantIncome': [str(entry.monthlyNetSalary)],
         'CoapplicantIncome': [entry.guarantorIncome],
         'LoanAmount': [entry.loanAmount],
         'Loan_Amount_Term': [entry.loanAmountTerm],
         'Credit_History': [1],
         'Property_Area': [entry.propertyType]
         }
    df = pd.DataFrame(data=d)
    df = df.iloc[:, 0: 11].values
    try:
        model = load_model()

        labelencoder_X = LabelEncoder()
        for i in range(0, 5):
            df[:, i] = labelencoder_X.fit_transform(df[:, i])

        df[:, 10] = labelencoder_X.fit_transform(df[:, 10])
        sc = StandardScaler()
        df = sc.fit_transform(df)

        prediction = model.predict(df)
        return prediction[0]
    except BaseException as e:
        print(e)
        return 0


if __name__ == '__main__':
    entry = Entries(name='Godfred Asamoah', gender='Male', education='Graduate', selfEmployed='No', maritalStatus='No',
                    propertyType='Rural', coapplicantIncome=0, dob=datetime.utcnow(), numberOfDependents=0,
                    applicantIncome=0, loanAmount=10000000, loanAmountTerm=360)
    print(predict(entry))
