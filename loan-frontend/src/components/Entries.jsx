import React, { Fragment, useEffect, useState } from 'react';
import { Avatar, Button, Descriptions, Modal, Spin, Table, Tag } from 'antd';
import moment from 'moment';
import { BASE_API_URL } from '../App';

const Entries = () => {
  const [dataSource, setDataSource] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState({
    firstName: '',
    surname: '',
    dob: '',
    gender: '',
    maritalStatus: '',
    numberOfDependents: '',
    education: '',
    email: '',
    telephoneNumber: '',
    city: '',
    address: '',
    isSelfEmployed: false,
    presentEmployer: '',
    occupation: '',
    yearsOfExperience: '',
    monthlyNetSalary: '',
    socialSecurityNumber: '',
    loanAmount: '',
    loanAmountTerm: '',
    loanPurpose: '',
    loanCategory: '',
    propertyType: '',
    creditScore: '',
    isAccountHolder: false,
    accountNumber: '',
    hasPendingLoan: false,
    hasCollateral: false,
    collateralImage: '',
    hasGuarantor: false,
    guarantorName: '',
    guarantorIncome: '',
    hasBankingRelationship: false,
    hasIncomeSentViaBank: false,
    loanStatus: '',
  });

  const yesTag = <Tag color="green">YES</Tag>;
  const noTag = <Tag color="volcano">NO</Tag>;

  useEffect(() => {
    (async () => {
      const { entries } = await fetch(`${BASE_API_URL}/entries`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        mode: 'cors',
      }).then(res => res.json());
      setDataSource(entries);
    })();
  }, []);

  const showDetail = entry => {
    setSelectedEntry(entry);
    setVisible(true);
  };
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name, entry) => (
        <span
          onClick={() => showDetail(entry)}
          style={{
            color: '#1890ff',
            textDecoration: 'none',
            backgroundColor: 'transparent',
            outline: 'none',
            cursor: 'pointer',
            WebkitTransition: 'color 0.3s',
            transition: 'color 0.3s',
            WebkitTextDecorationSkip: 'objects',
          }}
        >
          {name}
        </span>
      ),
    },
    {
      title: 'Date of Birth',
      dataIndex: 'dob',
      key: 'dob',
      render: dob => <span>{moment(dob).format('MMMM D, YYYY')}</span>,
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Marital Status',
      dataIndex: 'maritalStatus',
      key: 'maritalStatus',
    },
    {
      title: 'Education',
      dataIndex: 'education',
      key: 'education',
    },
    {
      title: 'Applicant Income',
      dataIndex: 'monthlyNetSalary',
      key: 'monthlyNetSalary',
      render: applicantIncome => <span>{`GH₵ ${applicantIncome}.00`}</span>,
    },
    {
      title: 'Loan Amount',
      dataIndex: 'loanAmount',
      key: 'loanAmount',
      render: loanAmount => <span>{`GH₵ ${loanAmount}.00`}</span>,
    },
    {
      title: 'Loan Status',
      dataIndex: 'loanStatus',
      key: 'loanStatus',
      render: status => (
        <Tag color={status ? 'green' : 'volcano'}>
          <span style={{ fontWeight: 'bold' }}>
            {status ? 'APPROVED ' : 'DECLINED'}
          </span>
        </Tag>
      ),
    },
  ];

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <div>
      <Spin spinning={dataSource.length === 0} size="large" tip="Loading...">
        <Table
          style={{ marginRight: '5000' }}
          dataSource={dataSource}
          columns={columns}
          rowKey={record => record.id}
        />
      </Spin>
      <Modal
        visible={visible}
        title="Details"
        onCancel={handleClose}
        width={800}
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
        <Descriptions title="Biometric Data">
          <Descriptions.Item label="First Name">
            {selectedEntry.firstName}
          </Descriptions.Item>
          <Descriptions.Item label="Surname">
            {selectedEntry.surname}
          </Descriptions.Item>
          <Descriptions.Item label="Date Of Birth">
            {moment(selectedEntry.dob).format('MMMM D, YYYY')}
          </Descriptions.Item>
          <Descriptions.Item label="Gender">
            {selectedEntry.gender}
          </Descriptions.Item>
          <Descriptions.Item label="Marital Status">
            {selectedEntry.maritalStatus}
          </Descriptions.Item>
          <Descriptions.Item label="Number of Dependents">
            {selectedEntry.numberOfDependents > 5
              ? '5+'
              : selectedEntry.numberOfDependents}
          </Descriptions.Item>
          <Descriptions.Item label="Education Level">
            {selectedEntry.education}
          </Descriptions.Item>
          <Descriptions.Item label="Email address">
            {selectedEntry.email}
          </Descriptions.Item>
          <Descriptions.Item label="Telephone number">
            {selectedEntry.telephoneNumber}
          </Descriptions.Item>
          <Descriptions.Item label="City">
            {selectedEntry.city}
          </Descriptions.Item>
          <Descriptions.Item label=" Home Address">
            {selectedEntry.address}
          </Descriptions.Item>
        </Descriptions>

        <Descriptions title="Employment Data">
          <Descriptions.Item label="Self Employed">
            {selectedEntry.isSelfEmployed ? yesTag : noTag}
          </Descriptions.Item>
          <Descriptions.Item label="Current Employer">
            {selectedEntry.presentEmployer}
          </Descriptions.Item>
          <Descriptions.Item label="Occupation">
            {selectedEntry.occupation}
          </Descriptions.Item>
          <Descriptions.Item label="Years of Experience">
            {selectedEntry.yearsOfExperience}
          </Descriptions.Item>
          <Descriptions.Item label="Applicant Income">
            {<span>{`GH₵ ${selectedEntry.monthlyNetSalary}.00`}</span>}
          </Descriptions.Item>
          <Descriptions.Item label="Social Security Number">
            {selectedEntry.socialSecurityNumber}
          </Descriptions.Item>
        </Descriptions>
        <Descriptions title="Loan Data">
          <Descriptions.Item label="Loan Amount">
            {<span>{`GH₵ ${selectedEntry.loanAmount}.00`}</span>}
          </Descriptions.Item>
          <Descriptions.Item label="Loan Amount Term">
            {selectedEntry.loanAmountTerm} months
          </Descriptions.Item>
          <Descriptions.Item label="Loan Category">
            {selectedEntry.loanCategory}
          </Descriptions.Item>
          <Descriptions.Item label="Purpose of Loan">
            {selectedEntry.loanPurpose}
          </Descriptions.Item>
          <Descriptions.Item label="Credit Score">
            {selectedEntry.creditScore}
          </Descriptions.Item>
          <Descriptions.Item label="Property Type">
            {selectedEntry.propertyType}
          </Descriptions.Item>
        </Descriptions>
        <Descriptions title="Bank Data" layout="vertical">
          <Descriptions.Item label="Has Bank Account">
            {selectedEntry.isAccountHolder ? yesTag : noTag}
          </Descriptions.Item>
          {selectedEntry.isAccountHolder && (
            <Descriptions.Item label="Bank Account Number">
              {selectedEntry.accountNumber}
            </Descriptions.Item>
          )}
          <Descriptions.Item label="Has Pending Loan">
            {selectedEntry.hasPendingLoan ? yesTag : noTag}
          </Descriptions.Item>
          <Descriptions.Item label="Has Collateral">
            {selectedEntry.hasCollateral ? yesTag : noTag}
          </Descriptions.Item>
          <Descriptions.Item label="Has a Guarantor">
            {selectedEntry.hasGuarantor ? yesTag : noTag}
          </Descriptions.Item>
          {selectedEntry.hasGuarantor && (
            <Fragment>
              <Descriptions.Item label="Guarantor Name">
                {selectedEntry.guarantorName}
              </Descriptions.Item>
              <Descriptions.Item label="Guarantor Income">
                <span>{`GH₵ ${selectedEntry.guarantorIncome}.00`}</span>
              </Descriptions.Item>
            </Fragment>
          )}
          <Descriptions.Item label="Banked for 6+ months">
            {selectedEntry.hasBankingRelationship ? yesTag : noTag}
          </Descriptions.Item>
          <Descriptions.Item label="Receives Income via this Bank">
            {selectedEntry.hasIncomeSentViaBank ? yesTag : noTag}
          </Descriptions.Item>
          {selectedEntry.hasCollateral &&
            selectedEntry.collateralImage.length > 0 && (
              <Descriptions.Item label="Collateral Image">
                <div>
                  <Avatar
                    src={selectedEntry.collateralImage}
                    shape="square"
                    size={256}
                  />
                </div>
              </Descriptions.Item>
            )}
        </Descriptions>
      </Modal>
    </div>
  );
};

export default Entries;
