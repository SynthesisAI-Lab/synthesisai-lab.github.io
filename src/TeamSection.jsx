import React from 'react';
import { Row, Col, Typography, Avatar, Space } from 'antd';
import { GithubOutlined, LinkedinOutlined, MailOutlined } from '@ant-design/icons';
import xinranImg from './assets/team/xinran.jpeg';
import boImg from './assets/team/bo.jpeg';
import ishitaImg from './assets/team/ishita.jpeg';
import congImg from './assets/team/cong.jpg';
import jooeunImg from './assets/team/jooeun.jpg';
import liamImg from './assets/team/liam.jpeg';
import miaoImg from './assets/team/miao.jpeg';

const { Title, Paragraph } = Typography;

const TeamMember = ({ name, role, title,image, github, linkedin, email, website }) => {
    const cardContent = (
        <div style={{
            textAlign: 'center',
            padding: '0',
            transition: 'transform 0.3s ease',
            cursor: website ? 'pointer' : 'default'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
            {image ? (
                <img 
                    src={image} 
                    alt={name}
                    style={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        marginBottom: 8,
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        objectFit: 'cover',
                        display: 'block'
                    }}
                />
            ) : (
                <Avatar
                    size={80}
                    style={{ marginBottom: 8, backgroundColor: '#1677ff' }}
                >
                    {name.charAt(0).toUpperCase()}
                </Avatar>
            )}
            <Title level={5} style={{ marginBottom: 2, fontSize: '1rem', fontWeight: 600, color: website ? '#4f46e5' : '#000' }}>{name}</Title>
            <Paragraph style={{ color: '#000', marginBottom: 0, fontSize: '0.875rem' }}>
                {role}
            </Paragraph>
            {title && (
                <Paragraph style={{ color: '#999', marginBottom: 8, fontSize: '0.725rem', fontWeight: 500 }}>
                    {title}
                </Paragraph>
            )}
            <Space style={{ gap: '12px' }}>
                {github && (
                    <a href={github} target="_blank" rel="noopener noreferrer" style={{ color: '#666', transition: 'color 0.2s' }}>
                        <GithubOutlined style={{ fontSize: 16 }} />
                    </a>
                )}
                {linkedin && (
                    <a href={linkedin} target="_blank" rel="noopener noreferrer" style={{ color: '#666', transition: 'color 0.2s' }}>
                        <LinkedinOutlined style={{ fontSize: 16 }} />
                    </a>
                )}
                {email && (
                    <a href={`mailto:${email}`} style={{ color: '#666', transition: 'color 0.2s' }}>
                        <MailOutlined style={{ fontSize: 16 }} />
                    </a>
                )}
            </Space>
        </div>
    );

    return (
        <Col xs={24} sm={20} md={10} lg={5} style={{ marginBottom: 12 }}>
            {website ? (
                <a href={website} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                    {cardContent}
                </a>
            ) : (
                cardContent
            )}
        </Col>
    );
};

const TeamSection = () => {
    const team = [
        {
            name: 'Xinran Zhu',
            role: 'Project Director | PI',
            title: 'Assistant Professor @UIUC',
            image: xinranImg,
            website: 'https://zhu-xinran.com/',
        },
         {
            name: 'Liam Magee',
            role: 'Collaborator | Co-PI',
            title: 'Professor @UIUC',
            image: liamImg,
            website: 'https://education.illinois.edu/profile/liam-magee',
        },
        {
            name: 'Bo Shui',
            role: 'Researcher, Developer',
            title: 'PhD Student @UIUC',
            image: boImg,
            website: 'https://www.boshui.site/',
        },
        {
            name: 'Cong Wang',
            role: 'Researcher',
            title: 'PhD Student @UIUC',
            image: congImg,
            website: 'https://www.linkedin.com/in/cong-wang-b560aa290/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
        },   
       {
            name: 'Miaomiao Wei',
            role: 'Researcher',
            title: 'PhD Student @UIUC',
            image: miaoImg,
            website: 'https://www.linkedin.com/in/yuanxun-w-427327178?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
        },  
        {
            name: 'Jooeun Shim',
            role: 'Collaborator',
            title: 'Assistant Professor of Teaching @Columbia University',
            image: jooeunImg,
            website: 'https://www.tc.columbia.edu/faculty/js4719/'
    
        },
        {
            name: 'Ishita Asnani',
            role: 'Developer (Intern, Summer25)',
            title: 'Undergrad Student @UIUC',
            image: ishitaImg,
            website: 'https://www.linkedin.com/in/ishita-asnani/',
        }, 
    ];

    return (
        <div style={{
            padding: '60px 20px',
            background: '#ffffff',
            textAlign: 'center'
        }}>
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                <Title level={2} style={{ marginBottom: 9, fontSize: '2rem', fontWeight: 500 }}>Project Team</Title>
                <Paragraph style={{ fontSize: '1rem', color: '#999', marginBottom: 40 }}>
                   
                </Paragraph>
                <Row gutter={[12, 12]} justify="center">
                    {team.map((member, index) => (
                        <TeamMember key={index} {...member} />
                    ))}
                </Row>
            </div>
        </div>
    );
};

export default TeamSection;
