import React, { useEffect, useState } from 'react';
import { Avatar, List, Skeleton, Typography, message } from 'antd';
import { useSelector } from 'react-redux';

const { Title, Text } = Typography;

const StudentAnnouncement = () => {
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
        `http://localhost:5236/api/Student/ViewAllAnnouncement`,
        `http://localhost:5236/api/Users/ViewAllAnnouncement`,
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
      marginLeft: '200px',
    },
    announcementTitle: {
      WebkitBackgroundClip: 'text',
      color: 'black',
      textAlign: 'center',
      marginBottom: '30px',
    },      
    announcementItem: {
      backgroundColor: '#fff',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '16px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      cursor: 'pointer',
    },
    announcementItemHover: {
      transform: 'scale(1.02)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
    },
    skeleton: {
      padding: 0,
    },
    skeletonTitle: {
      marginBottom: '8px',
    },
  };

  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div style={styles.driverAnnouncementPage}>
      <div style={styles.contentSection}>
        <div style={styles.announcementSection}>
          <Title level={1} style={styles.announcementTitle}>
            Announcements
          </Title>
          <List
            style={{ width: '1000px' }}
            loading={initLoading}
            itemLayout="vertical"
            dataSource={announcements}
            renderItem={(item, index) => (
              <List.Item
                style={
                  hoveredIndex === index
                    ? { ...styles.announcementItem, ...styles.announcementItemHover }
                    : styles.announcementItem
                }
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
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

export default StudentAnnouncement;
