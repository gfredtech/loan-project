import cloudinary
from cloudinary.uploader import upload
from cloudinary.utils import cloudinary_url
from flask import Flask, request, abort, jsonify
from flask_cors import CORS

from ml.predict import predict
from models import setup_db, Entries, create_tables, create_superuser, Admins

DEFAULT_TAG = 'loan-backend'


def create_app(test_config=None):
    app = Flask(__name__)
    CORS(app)

    setup_db(app)
    create_tables()
    create_superuser()

    cloudinary.config(
        cloud_name='dhpzvfror',
        api_key='189133823467731',
        api_secret='bG5lE7HT0KwhrvoRecQefpPak4s'
    )

    @app.after_request
    def after_request(response):
        response.headers.add(
            'Access-Control-Allow-Headers',
            'Content-Type, Authorization, True')
        response.headers.add(
            'Access-Control-Allow-Methods',
            'GET, POST, DELETE, PATCH, OPTIONS')
        return response

    @app.route('/', methods=['GET'])
    def health_check():
        return jsonify({
            'success': True,
            'description': 'App is running.'
        })

    @app.route('/login', methods=['POST'])
    def login_user():
        body = request.get_json()
        email = body.get('email')
        password = body.get('password')

        admin = Admins.query.filter(Admins.email == email, Admins.password == password).first()
        if admin:
            return jsonify({
                'success': True,
                'admin': admin.email
            })

        abort(403)

    @app.route('/admin/add', methods=['POST'])
    def add_user():
        body = request.get_json()
        email = body.get('email')
        password = body.get('password')

        admin = Admins.query.filter(Admins.email == email).first()
        if admin:
            return jsonify({
                'success': False,
                'message': 'Admin already exists',
                'admin': admin.email
            })

        admin = Admins(email=email, password=password)
        admin.insert()
        return jsonify({
            'success': True,
            'admin': admin.format(),
            'message': 'Successfully added new Admin'
        })

    @app.route('/entries', methods=['GET'])
    def get_entries():
        entries = Entries.query.all()

        if not entries:
            entries = []

        entries = [entry.format() for entry in entries]

        return jsonify({
            'success': True,
            'entries': entries
        })

    @app.route('/entries/new', methods=['POST'])
    def add_entry():
        body = request.get_json()

        firstName = body.get('firstName')
        surname = body.get('surname')
        dob = body.get('dob')
        gender = body.get('gender')
        maritalStatus = body.get('maritalStatus')
        numberOfDependents = body.get('numberOfDependents')
        isSelfEmployed = body.get('isSelfEmployed')
        education = body.get('education')
        telephoneNumber = body.get('telephoneNumber')
        email = body.get('email')
        city = body.get('city')
        address = body.get('address')
        presentEmployer = body.get('presentEmployer')
        occupation = body.get('occupation')
        yearsOfExperience = body.get('yearsOfExperience')
        monthlyNetSalary = body.get('monthlyNetSalary')
        socialSecurityNumber = body.get('socialSecurityNumber')
        loanAmount = body.get('loanAmount')
        loanAmountTerm = body.get('loanAmountTerm')
        loanPurpose = body.get('loanPurpose')
        loanCategory = body.get('loanCategory')
        propertyType = body.get('propertyType')
        creditScore = body.get('creditScore')
        isAccountHolder = body.get('isAccountHolder')
        accountNumber = body.get('accountNumber')
        hasPendingLoan = body.get('hasPendingLoan')
        hasCollateral = body.get('hasCollateral')
        collateralImage = body.get('collateralImage')
        hasGuarantor = body.get('hasGuarantor')
        guarantorName = body.get('guarantorName')
        guarantorIncome = body.get('guarantorIncome')
        hasBankingRelationship = body.get('hasBankingRelationship')
        hasIncomeSentViaBank = body.get('hasIncomeSentViaBank')

        try:
            entry = Entries(firstName=firstName, surname=surname, dob=dob, gender=gender,
                            isSelfEmployed=isSelfEmployed, education=education, maritalStatus=maritalStatus,
                            telephoneNumber=telephoneNumber, numberOfDependents=numberOfDependents, email=email,
                            city=city,
                            address=address, presentEmployer=presentEmployer, occupation=occupation,
                            yearsOfExperience=yearsOfExperience, monthlyNetSalary=monthlyNetSalary,
                            socialSecurityNumber=socialSecurityNumber, loanAmount=loanAmount,
                            loanAmountTerm=loanAmountTerm,
                            loanPurpose=loanPurpose, loanCategory=loanCategory, propertyType=propertyType,
                            creditScore=creditScore, isAccountHolder=isAccountHolder, accountNumber=accountNumber,
                            hasPendingLoan=hasPendingLoan, hasCollateral=hasCollateral, collateralImage=collateralImage,
                            hasGuarantor=hasGuarantor, guarantorName=guarantorName, guarantorIncome=guarantorIncome,
                            hasBankingRelationship=hasBankingRelationship, hasIncomeSentViaBank=hasIncomeSentViaBank)

            entry.loanStatus = predict(entry) and (entry.hasBankingRelationship and entry.hasIncomeSentViaBank and
                                                   hasCollateral and int(entry.creditScore) > 1000)

            entry.insert()

            return jsonify({
                'success': True,
                'entry': entry.format(),
            })
        except BaseException as e:
            print(e)
            abort(422)

    @app.route('/admins', methods=['GET'])
    def get_admins():
        admins = Admins.query.all()

        if not admins:
            abort(422)

        admins = [admin.format() for admin in admins]

        return jsonify({
            'success': True,
            'admins': admins
        })

    @app.route('/upload.do', methods=['POST'])
    def do_upload():
        file_to_upload = request.files['collateralImage']
        if file_to_upload:
            response = upload(file_to_upload, tags=DEFAULT_TAG)
            url, options = cloudinary_url(
                response['public_id'],
                format=response['format'],
            )
            return jsonify({
                'scc': True,
                'url': url,
            })

    # Error handlers
    @app.errorhandler(400)
    def bad_request(error):
        return jsonify({
            'success': False,
            'error': 400,
            'message': 'Bad Request',
        }), 400

    @app.errorhandler(404)
    def not_found(error):
        return jsonify({
            'success': False,
            'error': 404,
            'message': 'Resource Not Found'
        }), 404

    @app.errorhandler(422)
    def unable_to_process(error):
        return jsonify({
            'success': False,
            'error': 422,
            'message': 'Unable to process request'
        }), 422

    @app.errorhandler(403)
    def unable_to_process(error):
        return jsonify({
            'success': False,
            'error': 403,
            'message': 'Forbidden'
        }), 403

    return app


app = create_app()

if __name__ == '__main__':
    app.run(port=5000, debug=True)
