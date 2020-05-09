import React, { Fragment, useState } from 'react';
import {
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Switch,
  Tag,
  Tooltip,
  Upload,
} from 'antd';
import { BASE_API_URL } from '../App';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const NewEntry = () => {
  const [hasCollateral, setHasCollateral] = useState(false);
  const [hasGuarantor, setHasGuarantor] = useState(false);
  const [hasAccount, setHasAccount] = useState(false);
  const [positive, setPositive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [collateralImage, setCollateralImage] = useState([]);
  const [name, setName] = useState('');

  const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      offset: 2,
      span: 7,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 8,
    },
  };

  const handleSubmit = async values => {
    // setLoading(true);
    const { entry } = await fakeFetch(values);
    setPositive(entry['loanStatus']);
    setVisible(true);
    setLoading(false);
    setName(entry.firstName);
  };

  const fakeFetch = async values => {
    return await fetch(`${BASE_API_URL}/entries/new`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...values,
        collateralImage: collateralImage[0] && collateralImage[0].url,
      }),
      mode: 'cors',
    }).then(res => res.json());
  };

  const normFile = e => {
    // slice(-1) to keep only last uploaded photo
    if (Array.isArray(e)) {
      return e.slice(-1);
    }

    return e && e.fileList.slice(-1);
  };

  const handleClose = () => {
    setVisible(false);
  };

  const handleChange = info => {
    let fileList = [...info.fileList];

    fileList.map(file => {
      if (file.response) {
        file.url = file.response.url;
      }
      return file;
    });
    setCollateralImage(fileList);
  };

  return (
    <div>
      <h2>Enter New Loan Application</h2>
      <Form
        {...layout}
        name="basic"
        initialValues={{
          gender: '',
          maritalStatus: '',
          isSelfEmployed: false,
          education: '',
          loanCategory: '',
          propertyType: '',
          hasPendingLoan: false,
          hasBankingRelationship: false,
          hasCollateral: false,
          hasGuarantor: false,
          hasIncomeSentViaBank: false,
          isAccountHolder: false,
        }}
        onFinish={handleSubmit}
        scrollToFirstError={true}
        labelAlign={'left'}
      >
        <Divider>Biometric Data</Divider>
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[
            {
              required: true,
              message: 'Please input first name',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Surnames"
          name="surname"
          rules={[
            {
              required: true,
              message: 'Please input surname',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Date of Birth"
          name="dob"
          rules={[
            {
              required: true,
              message: 'Please input first name',
            },
          ]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          label="Gender"
          name="gender"
          rules={[
            {
              required: true,
              message: 'Please select your gender',
            },
          ]}
        >
          <Select>
            <Option value="" disabled>
              Select Gender
            </Option>
            <Option value="Male">Male</Option>
            <Option value="Female">Female</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Marital Status"
          name="maritalStatus"
          rules={[
            {
              required: true,
              message: 'Please select marital status',
            },
          ]}
        >
          <Select>
            <Option value="" disabled>
              Select status
            </Option>
            <Option value="Single">Single</Option>
            <Option value="Married">Married</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="No. of Dependents"
          name="numberOfDependents"
          rules={[
            {
              required: true,
              message: 'Please enter number of dependents. 0 if none',
            },
          ]}
        >
          <InputNumber min={0} max={10} />
        </Form.Item>
        <Form.Item
          label="Education level"
          name="education"
          rules={[
            {
              required: true,
              message: 'Please select Education Level',
            },
          ]}
        >
          <Select>
            <Option value="" disabled>
              Select Education Level
            </Option>
            <Option value="Graduate">University Graduate</Option>
            <Option value="Undergraduate">Undergraduate & below</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Telephone Number"
          name="telephoneNumber"
          rules={[
            {
              required: true,
              message: 'Please input your telephone number',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email Address"
          name="email"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="City"
          name="city"
          rules={[
            {
              required: true,
              message: 'Please input city!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Home Address"
          name="address"
          rules={[
            {
              required: true,
              message: 'Please input home address!',
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <Divider>Employment Data</Divider>
        <Form.Item
          label="Are you self-employed?"
          name="isSelfEmployed"
          valuePropName="checked"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Switch />
        </Form.Item>
        <Form.Item
          label="Current Employer"
          name="presentEmployer"
          rules={[
            {
              required: true,
              message: 'Please enter your current employer',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Occupation"
          name="occupation"
          rules={[
            {
              required: true,
              message: 'Please input occupation',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Years of Experience"
          name="yearsOfExperience"
          rules={[
            {
              pattern: /^[0-9]+$/,
              message: 'Please enter years of experience',
            },
            {
              required: true,
              message: 'Please enter years of experience',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Monthly Salary"
          name="monthlyNetSalary"
          rules={[
            {
              pattern: /^[0-9]+$/,
              message: 'Invalid input',
            },
            {
              required: true,
              message: 'Please input monthly salary',
            },
          ]}
        >
          <Input addonBefore="GH₵" />
        </Form.Item>
        <Form.Item
          label="Social Security No."
          name="socialSecurityNumber"
          rules={[
            {
              required: true,
              message: 'Please input social security number',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Divider>Loan Data</Divider>
        <Form.Item
          label="Loan Amount"
          name="loanAmount"
          rules={[
            {
              pattern: /^[0-9]+$/,
              message: 'Invalid input',
            },
            {
              required: true,
              message: 'Please input loan Amount',
            },
          ]}
        >
          <Input addonBefore="GH₵" />
        </Form.Item>
        <Tooltip title="How many months does the person expect to settle all loan debt?">
          <Form.Item
            label="Loan Amount Term"
            name="loanAmountTerm"
            rules={[
              {
                pattern: /^[0-9]+$/,
                message: 'Invalid input',
              },
              {
                required: true,
                message: 'Please input term',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Tooltip>
        <Form.Item
          label="Purpose of Loan"
          name="loanPurpose"
          rules={[
            {
              required: true,
              message: 'Input cannot be empty',
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label="Loan Category"
          name="loanCategory"
          rules={[
            {
              min: 1,
              message: 'Please select a category',
            },
            {
              required: true,
              message: 'Please select a category',
            },
          ]}
        >
          <Select>
            <Option value="" disabled>
              Select Loan Category
            </Option>
            <Option value="Mortgage">Mortgage</Option>
            <Option value="Fees">Fees</Option>
            <Option value="Business">Business</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Credit Score"
          name="creditScore"
          rules={[
            {
              pattern: /^[0-9]+$/,
              message: 'Please enter valid input',
            },
            {
              required: true,
              message: 'Please enter credit score',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Tooltip title="Property type in which the customer lives">
          <Form.Item
            label="Property Type"
            name="propertyType"
            rules={[
              {
                min: 1,
                message: 'Please select a category',
              },
              {
                required: true,
                message: 'Please select a category',
              },
            ]}
          >
            <Select>
              <Option value="" disabled>
                Select Property Type
              </Option>
              <Option value="Rural">Rural</Option>
              <Option value="Semi-urban">Semiurban</Option>
              <Option value="Urban">Urban</Option>
            </Select>
          </Form.Item>
        </Tooltip>
        <Divider>Banking Data</Divider>
        <p>Does the customer (have a/an):</p>
        <Form.Item
          label="1. Account?"
          name="isAccountHolder"
          valuePropName="checked"
        >
          <Switch checked={hasAccount} onChange={e => setHasAccount(e)} />
        </Form.Item>
        {hasAccount && (
          <Form.Item
            label="Account Number"
            name="accountNumber"
            rules={[
              {
                required: true,
                message: 'Please input bank account number',
              },
            ]}
          >
            <Input />
          </Form.Item>
        )}
        <Form.Item
          label="2. Pending loan(s)?"
          valuePropName="checked"
          name="hasPendingLoan"
        >
          <Switch />
        </Form.Item>
        <Form.Item
          label="3. Collateral?"
          valuePropName="checked"
          name="hasCollateral"
        >
          <Switch checked={hasCollateral} onChange={e => setHasCollateral(e)} />
        </Form.Item>
        {hasCollateral && (
          <Form.Item
            label="Collateral Image"
            name="collateralImage"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[
              {
                required: true,
                message: 'Please upload a PNG/JPG scan of collateral document',
              },
            ]}
            extra={<span>File must be of type PNG/JPG</span>}
          >
            <Upload
              name="collateralImage"
              fileList={collateralImage}
              onChange={handleChange}
              action={`${BASE_API_URL}/upload.do`}
            >
              <Button>
                <UploadOutlined /> Click to Upload
              </Button>
            </Upload>
          </Form.Item>
        )}
        <Form.Item
          label="4. Any Guarantor?"
          valuePropName="checked"
          name="hasGuarantor"
        >
          <Switch checked={hasGuarantor} onChange={e => setHasGuarantor(e)} />
        </Form.Item>
        {hasGuarantor && (
          <Fragment>
            <Form.Item
              label="Guarantor's Name"
              name="guarantorName"
              rules={[
                {
                  required: true,
                  message: "Please guarantor's name",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Guarantor's Income"
              name="guarantorIncome"
              rules={[
                {
                  required: true,
                  message: "Please guarantor's income",
                },
              ]}
            >
              <Input addonBefore="GH₵" />
            </Form.Item>
          </Fragment>
        )}
        <Tooltip title="Has the person been a customer of the bank for at least 6 months?">
          <Form.Item
            label="5. Existing Relationship with bank?"
            name="hasBankingRelationship"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </Tooltip>
        <Tooltip title="Does the customer's monthly salary get sent through their account at this bank?">
          <Form.Item
            label="6. Receive Income Here?"
            name="hasIncomeSentViaBank"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </Tooltip>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Modal
        visible={visible}
        title="Loan Status"
        onCancel={handleClose}
        footer={
          <Button
            onClick={() => {
              handleClose();
            }}
          >
            Close
          </Button>
        }
      >
        <div>
          {}
          <span style={{ fontWeight: 'bold' }}>
            {`${name}'s Loan Status: `}
            <Tag color={positive ? 'green' : 'volcano'}>
              {positive ? 'APPROVED' : 'DECLINED'}
            </Tag>
          </span>
        </div>
      </Modal>
    </div>
  );
};

export default NewEntry;
