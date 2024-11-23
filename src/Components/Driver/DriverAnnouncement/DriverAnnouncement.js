import React, { useEffect, useState } from 'react';
import { Avatar, List, Skeleton, Typography, message } from 'antd';
import { useSelector } from 'react-redux';

const { Title, Text } = Typography;

const DriverAnnouncement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [initLoading, setInitLoading] = useState(true);

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
        `https://localhost:7032/api/Driver/ViewAllAnnouncement`,
        `https://localhost:7032/api/Users/ViewAllAnnouncement`
      ];

      const fetchOptions = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const responses = await Promise.all(urls.map((url) => fetch(url, fetchOptions)));
      if (responses.some((response) => !response.ok)) {
        throw new Error('One or more requests failed');
      }

      const data = await Promise.all(responses.map((response) => response.json()));
      const announcements = data.flatMap((dataSet) =>
        dataSet.$values.map((item) => ({
          title: item.title,
          content: item.content,
          createdTime: item.createdTime,
        }))
      );

      setAnnouncements(announcements);
    } catch (error) {
      console.error('Error fetching announcements:', error);
      message.error('Failed to load announcements.');
    } finally {
      setInitLoading(false);
    }
  };

  // Define styles
  const styles = {
    driverAnnouncementPage: {
      display: 'flex',
      minHeight: '100vh',
    },
    contentSection: {
      flex: 1,
      padding: '24px',
      backgroundColor: '#f0f2f5',
    },
    announcementSection: {
      maxWidth: '800px',
      margin: '0 auto',
    },
    announcementTitle: {
      color: '#003a8c',
      textAlign: 'center',
      marginBottom: '24px',
    },
    announcementItem: {
      backgroundColor: '#fff',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '16px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
    },
    skeleton: {
      padding: 0,
    },
    skeletonTitle: {
      marginBottom: '8px',
    },
  };

  return (
    <div style={styles.driverAnnouncementPage}>
      <div style={styles.contentSection}>
        <div style={styles.announcementSection}>
          <Title level={3} style={styles.announcementTitle}>
            Announcements
          </Title>
          <List
            style={styles.announcementList}
            loading={initLoading}
            itemLayout="vertical"
            dataSource={announcements}
            renderItem={(item) => (
              <List.Item style={styles.announcementItem}>
                <Skeleton
                  avatar
                  title={false}
                  loading={item.loading}
                  active
                  style={styles.skeleton}
                >
                  <List.Item.Meta
                    avatar={<Avatar src="https://via.placeholder.com/40" alt="Announcement" />}
                    title={<Text strong>{item.title}</Text>}
                    description={
                      <Text type="secondary">
                        {new Date(item.createdTime).toLocaleDateString()}
                      </Text>
                    }
                  />
                  <Text>{item.content}</Text>
                </Skeleton>
              </List.Item>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default DriverAnnouncement;
