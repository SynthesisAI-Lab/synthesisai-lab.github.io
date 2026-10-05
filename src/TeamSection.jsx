import React from 'react';
import { GithubOutlined, LinkedinOutlined, MailOutlined } from '@ant-design/icons';
import xinranImg from './assets/team/xinran.jpeg';
import boImg from './assets/team/bo.jpeg';
import ishitaImg from './assets/team/ishita.jpeg';
import congImg from './assets/team/cong.jpg';
import jooeunImg from './assets/team/jooeun.jpg';
import liamImg from './assets/team/liam.jpeg';
import miaoImg from './assets/team/miao.jpeg';

const TeamMember = ({ name, role, title, image, github, linkedin, email, website }) => {
    const Card = website ? 'a' : 'div';
    const linkProps = website ? { href: website, target: '_blank', rel: 'noopener noreferrer' } : {};

    return (
        <Card
            {...linkProps}
            className="group flex w-44 flex-col items-center text-center no-underline transition-transform duration-300 hover:-translate-y-1"
        >
            {image ? (
                <img
                    src={image}
                    alt={name}
                    className="mb-3 size-20 rounded-full object-cover ring-2 ring-white shadow-md shadow-gray-200 transition-shadow duration-300 group-hover:shadow-lg group-hover:shadow-brand/20"
                />
            ) : (
                <span className="mb-3 flex size-20 items-center justify-center rounded-full bg-brand text-2xl font-semibold text-white">
                    {name.charAt(0).toUpperCase()}
                </span>
            )}
            <h5 className={`text-base font-semibold ${website ? 'text-brand' : 'text-gray-900'}`}>{name}</h5>
            <p className="mt-0.5 text-sm text-gray-800">{role}</p>
            {title && <p className="mt-0.5 text-xs font-medium text-gray-400">{title}</p>}
            {(github || linkedin || email) && (
                <div className="mt-2 flex gap-3 text-gray-500">
                    {github && <a href={github} target="_blank" rel="noopener noreferrer" className="hover:text-brand"><GithubOutlined /></a>}
                    {linkedin && <a href={linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-brand"><LinkedinOutlined /></a>}
                    {email && <a href={`mailto:${email}`} className="hover:text-brand"><MailOutlined /></a>}
                </div>
            )}
        </Card>
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
        <section className="bg-white px-5 py-16 text-center">
            <div className="mx-auto max-w-6xl">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">Project Team</h2>
                <div className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-x-4 gap-y-8">
                    {team.map((member) => (
                        <TeamMember key={member.name} {...member} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamSection;
