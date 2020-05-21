import os

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, String, Integer

db = SQLAlchemy()
database_path = os.environ['DATABASE_URL']


def setup_db(app):
    app.config['SQLALCHEMY_DATABASE_URI'] = database_path
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.app = app
    db.init_app(app)


def create_tables():
    pass
    # db.drop_all()
    # db.create_all()


def create_superuser(email, password):
    admin = Admins(email=email, password=password)
    admin.insert()


class Admins(db.Model):
    __tablename__ = 'admins'

    id = Column(Integer(), primary_key=True)
    email = Column(String())
    password = Column(String())

    def insert(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def format(self):
        return {
            'id': self.id,
            'email': self.email,
            'password': self.password
        }


class Entries(db.Model):
    __tablename__ = 'entries'

    id = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.String)
    surname = db.Column(db.String)
    dob = db.Column(db.Date)
    gender = db.Column(db.String)
    maritalStatus = db.Column(db.String)
    numberOfDependents = db.Column(db.Integer)
    isSelfEmployed = db.Column(db.Boolean)
    education = db.Column(db.String)
    telephoneNumber = db.Column(db.String)
    email = db.Column(db.String)
    city = db.Column(db.String)
    address = db.Column(db.String)
    presentEmployer = db.Column(db.String)
    occupation = db.Column(db.String)
    yearsOfExperience = db.Column(db.Integer)
    monthlyNetSalary = db.Column(db.Integer)
    socialSecurityNumber = db.Column(db.String)
    loanAmount = db.Column(db.Integer)
    loanAmountTerm = db.Column(db.Integer)
    loanPurpose = db.Column(db.String)
    loanCategory = db.Column(db.String)
    propertyType = db.Column(db.String)
    creditScore = db.Column(db.Integer)
    isAccountHolder = db.Column(db.Boolean)
    accountNumber = db.Column(db.String)
    hasPendingLoan = db.Column(db.Boolean)
    hasCollateral = db.Column(db.Boolean)
    collateralImage = db.Column(db.String)
    hasGuarantor = db.Column(db.Boolean)
    guarantorName = db.Column(db.String)
    guarantorIncome = db.Column(db.Integer)
    hasBankingRelationship = db.Column(db.Boolean)
    hasIncomeSentViaBank = db.Column(db.Boolean)
    loanStatus = db.Column(db.Boolean)

    def insert(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def format(self):
        return {
            'id': self.id,
            'name': f'{self.firstName} {self.surname}',
            'firstName': self.firstName,
            'surname': self.surname,
            'dob': self.dob,
            'gender': self.gender,
            'maritalStatus': self.maritalStatus,
            'numberOfDependents': self.numberOfDependents,
            'isSelfEmployed': self.isSelfEmployed,
            'education': self.education,
            'telephoneNumber': self.telephoneNumber,
            'email': self.email,
            'city': self.city,
            'address': self.address,
            'presentEmployer': self.presentEmployer,
            'occupation': self.occupation,
            'yearsOfExperience': self.yearsOfExperience,
            'monthlyNetSalary': self.monthlyNetSalary,
            'socialSecurityNumber': self.socialSecurityNumber,
            'loanAmount': self.loanAmount,
            'loanAmountTerm': self.loanAmountTerm,
            'loanPurpose': self.loanPurpose,
            'loanCategory': self.loanCategory,
            'propertyType': self.propertyType,
            'creditScore': self.creditScore,
            'isAccountHolder': self.isAccountHolder,
            'accountNumber': self.accountNumber,
            'hasPendingLoan': self.hasPendingLoan,
            'hasCollateral': self.hasCollateral,
            'collateralImage': self.collateralImage,
            'hasGuarantor': self.hasGuarantor,
            'guarantorName': self.guarantorName,
            'guarantorIncome': self.guarantorIncome,
            'hasBankingRelationship': self.hasBankingRelationship,
            'hasIncomeSentViaBank': self.hasIncomeSentViaBank,
            'loanStatus': self.loanStatus,
        }
