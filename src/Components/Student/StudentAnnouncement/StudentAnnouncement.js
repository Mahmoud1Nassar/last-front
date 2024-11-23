import React, { useEffect, useState } from 'react';
import { List, Avatar, Skeleton, Typography } from 'antd';
import { useSelector } from 'react-redux';
const { Title, Text } = Typography;

const StudentAnnouncement = () => {
  const [initLoading, setInitLoading] = useState(true);
  const [announcements, setAnnouncements] = useState([]);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      fetchAnnouncements();
    }
  }, [token]);

  const fetchAnnouncements = async () => {
    setInitLoading(true);
    try {
      const urls = [
        `http://localhost:5236/api/Student/ViewAllAnnouncement`,
        `http://localhost:5236/api/Users/ViewAllAnnouncement`
      ];
      const fetchOptions = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const responses = await Promise.all(urls.map(url => fetch(url, fetchOptions)));
      if (responses.some(response => !response.ok)) {
        throw new Error('One or more requests failed');
      }
      const data = await Promise.all(responses.map(response => response.json()));
      const announcements = data.flatMap(dataSet =>
        dataSet.$values.map(item => ({
          title: item.title,
          content: item.content,
          createdTime: item.createdTime,
        }))
      );
      setAnnouncements(announcements);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    } finally {
      setInitLoading(false);
    }
  };

  return (
    <div className="content-section">
      <div className="announcement-section">
        <Title level={3} className="announcement-title">Announcements</Title>
        <List
          className="announcement-list"
          loading={initLoading}
          dataSource={announcements}
          renderItem={(item) => (
            <List.Item className="announcement-item">
              <Skeleton avatar title={false} loading={item.loading} active>
                <List.Item.Meta
                  avatar={<Avatar src="https://via.placeholder.com/40" alt="Announcement" />}
                  title={<Text strong>{item.title}</Text>}
                  description={<Text type="secondary">{new Date(item.createdTime).toLocaleDateString()}</Text>}
                />
                <Text>{item.content}</Text>
              </Skeleton>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default StudentAnnouncement;