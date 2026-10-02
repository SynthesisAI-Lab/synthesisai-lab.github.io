import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { Layout, Typography, Button, Tabs, theme, Row, Col, Grid, ConfigProvider } from 'antd';
import { RocketOutlined, PlayCircleOutlined, LeftOutlined, RightOutlined, CommentOutlined, DeploymentUnitOutlined, EditOutlined, ArrowRightOutlined, FolderAddOutlined, TeamOutlined, HighlightOutlined, ExperimentOutlined } from '@ant-design/icons';
import { getStartedSteps, courseSetupSteps, annotationSteps, synthesisCanvasSteps } from './tutorialData';
import TeamSection from './TeamSection';

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;
const { useBreakpoint } = Grid;

const APP_URL = 'http://74.249.196.43/v2/';

const landingImage = new URL('./assets/tutorial_assets/v2/landing_page.png', import.meta.url).href;

// Import techy font
const fontLink = document.createElement('link');
fontLink.href = 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap';
fontLink.rel = 'stylesheet';
document.head.appendChild(fontLink);

const parseBoldText = (text) => {
    const parts = text.split(/(\*\*.*?\*\*)/);
    return parts.map((part, idx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={idx}>{part.slice(2, -2)}</strong>;
        }
        return <span key={idx}>{part}</span>;
    });
};

const StepViewer = ({ steps, onNextTab, onPrevTab, isActive, onStepChange, targetStep }) => {
    const screens = useBreakpoint();
    const [currentStep, setCurrentStep] = useState(0);
    const [opacity, setOpacity] = useState(0);

    useEffect(() => {
        if (isActive && (targetStep === undefined || targetStep === null)) {
            setOpacity(0);
            const timer = setTimeout(() => setOpacity(1), 100);
            return () => clearTimeout(timer);
        }
    }, [isActive, targetStep]);

    useEffect(() => {
        if (targetStep !== undefined && targetStep !== null && targetStep !== currentStep) {
            changeStep(targetStep);
        }
    }, [targetStep]);

    useEffect(() => {
        if (onStepChange) {
            onStepChange(currentStep);
        }
    }, [currentStep, onStepChange]);

    const changeStep = (newStep) => {
        setOpacity(0);
        setTimeout(() => {
            setCurrentStep(newStep);
            setOpacity(1);
        }, 300);
    };

    const nextStep = useCallback(() => {
        if (currentStep < steps.length - 1) {
            changeStep(currentStep + 1);
        } else if (onNextTab) {
            onNextTab();
        }
    }, [currentStep, steps.length, onNextTab]);

    const prevStep = useCallback(() => {
        if (currentStep > 0) {
            changeStep(currentStep - 1);
        } else if (onPrevTab) {
            onPrevTab();
        }
    }, [currentStep, onPrevTab]);

    useEffect(() => {
        if (!isActive) return;

        const handleKeyDown = (e) => {
            const activeElement = document.activeElement;
            if (activeElement && (
                activeElement.getAttribute('role') === 'tab' ||
                activeElement.tagName === 'INPUT' ||
                activeElement.tagName === 'TEXTAREA'
            )) {
                return;
            }

            if (e.key === 'ArrowRight') nextStep();
            if (e.key === 'ArrowLeft') prevStep();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [nextStep, prevStep, isActive]);

    const step = steps[currentStep];

    return (
        <div style={{ padding: '20px 20px', maxWidth: 1200, margin: '0 auto' }}>
            <Row gutter={[40, 40]} align="middle">
                <Col xs={24} lg={14}>
                    <div style={{
                        boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        background: '#f5f5f5',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: screens.md ? 360 : 200,
                        position: 'relative'
                    }}>
                        <img
                            src={step.image}
                            alt={step.title}
                            style={{
                                width: '100%',
                                height: 'auto',
                                display: 'block',
                                opacity: opacity,
                                transition: 'opacity 0.3s ease-in-out'
                            }}
                        />
                    </div>
                </Col>
                <Col xs={24} lg={10}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingLeft: screens.lg ? 40 : 0 }}>
                        <Title level={3} style={{ marginBottom: 16, marginTop: 0, fontSize: '1.3rem' }}>{step.title}</Title>
                        {Array.isArray(step.description) ? (
                            <ol style={{ fontSize: '0.9rem', color: '#555', marginBottom: 32, lineHeight: 1.6, paddingLeft: 20 }}>
                                {step.description.map((item, idx) => (
                                    <li key={idx}>{parseBoldText(item)}</li>
                                ))}
                            </ol>
                        ) : (
                            <Paragraph style={{ fontSize: '0.88rem', color: '#555', marginBottom: 32, lineHeight: 1.3 }}>
                                {parseBoldText(step.description)}
                            </Paragraph>
                        )}

                        <div style={{ display: 'flex', gap: 8, marginBottom: 30, flexWrap: 'wrap' }}>
                            {steps.map((_, index) => (
                                <div
                                    key={index}
                                    style={{
                                        width: 8, height: 8, borderRadius: '50%',
                                        background: index === currentStep ? '#4f46e5' : '#ddd',
                                        cursor: 'pointer',
                                        transition: 'background 0.3s'
                                    }}
                                    onClick={() => changeStep(index)}
                                />
                            ))}
                        </div>

                        <div style={{ display: 'flex', gap: 15 }}>
                            <Button
                                shape={currentStep === 0 && onPrevTab ? 'round' : 'circle'}
                                icon={<LeftOutlined />}
                                onClick={prevStep}
                                disabled={currentStep === 0 && !onPrevTab}
                                size="small"
                                style={currentStep === 0 && onPrevTab ? { padding: '0 15px' } : {}}
                            >
                                {currentStep === 0 && onPrevTab ? 'Previous Tab' : null}
                            </Button>
                            <Button
                                type="primary"
                                shape={currentStep === steps.length - 1 ? 'round' : 'circle'}
                                icon={<RightOutlined />}
                                iconPlacement="end"
                                onClick={nextStep}
                                disabled={currentStep === steps.length - 1 && !onNextTab}
                                size="small"
                                style={currentStep === steps.length - 1 ? { padding: '0 15px' } : {}}
                            >
                                {currentStep === steps.length - 1 ? 'Next Tab' : null}
                            </Button>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

const ProjectBigPicture = ({ innerRef, activeStep, onStepClick }) => {
    const screens = useBreakpoint();
    const steps = [
        { icon: <TeamOutlined />, title: <>Join<br />a Course</> },
        { icon: <FolderAddOutlined />, title: <>Course & Module Setup<br />(instructor only)</> },
        { icon: <HighlightOutlined />, title: <>Annotate & Discuss<br />the Readings</> },
        { icon: <DeploymentUnitOutlined />, title: <>Knowledge Synthesis<br />Graph</> },
        { icon: <CommentOutlined />, title: <>Iterate with Your Group<br />& AI Agents</> },
        { icon: <EditOutlined />, title: <>Co-write<br />the Synthesis</> },
    ];

    return (
        <div ref={innerRef} style={{ padding: screens.md ? '10px 20px' : '10px 20px', background: '#fff' }}>
            <div style={{ maxWidth: 1000, margin: '0 auto' }}>
                <Title level={2} style={{ textAlign: 'center', marginBottom: 10, marginTop: 35, fontSize: '2rem' }}>
                    How It Works
                </Title>
                <div style={{ textAlign: 'center', marginBottom: 15, color: '#707070', fontSize: '1rem', lineHeight: 1.8 }}>
                    Students annotate course readings together, turn their discussions into a shared knowledge graph with AI agents,
                    <br />and co-write a synthesis that cites the ideas it builds on.
                    <br /><br />Click the icons to explore the workflow. <br />
                </div>
                <Row gutter={[8, 16]} justify="center" align="stretch" style={{ marginBottom: 20 }}>
                    {steps.map((step, index) => {
                        const isActive = index === activeStep;
                        const color = isActive ? '#fff' : '#4f46e5';
                        const bgColor = isActive ? '#4f46e5' : '#f5f5f5';

                        return (
                            <React.Fragment key={index}>
                                <Col xs={24} sm={12} md={3} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                                    <div
                                        onClick={() => onStepClick(index)}
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            textAlign: 'center',
                                            gap: 10,
                                            opacity: 1,
                                            transform: isActive ? 'scale(1.05)' : 'scale(1)',
                                            transition: 'all 0.3s ease',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <div style={{
                                            fontSize: 30,
                                            color: color,
                                            background: bgColor,
                                            width: 68,
                                            height: 68,
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            boxShadow: isActive ? '0 4px 12px rgba(22, 119, 255, 0.3)' : 'none',
                                            transition: 'all 0.3s ease'
                                        }}>
                                            {step.icon}
                                        </div>
                                        <div style={{ fontSize: '0.82rem', fontWeight: isActive ? 600 : 400, lineHeight: 1.3, color: '#333' }}>
                                            {step.title}
                                        </div>
                                    </div>
                                </Col>
                                {index < steps.length - 1 && (
                                    <Col xs={0} md={0} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                                        <div style={{ height: 52, display: 'flex', alignItems: 'center' }}>
                                            <ArrowRightOutlined style={{ fontSize: 16, color: '#bfbfbf' }} />
                                        </div>
                                    </Col>
                                )}
                            </React.Fragment>
                        );
                    })}
                </Row>
            </div>
        </div>
    );
};

const Tutorial = ({ onGoHome }) => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const screens = useBreakpoint();

    const [activeTab, setActiveTab] = useState('1');
    const [tabSteps, setTabSteps] = useState({ '1': 0, '2': 0, '3': 0, '4': 0 });
    const [targetStepMap, setTargetStepMap] = useState({ '1': null, '2': null, '3': null, '4': null });
    const tutorialSectionRef = useRef(null);
    const howItWorksRef = useRef(null);

    useEffect(() => {
        document.title = "Synthesis AI Lab Tutorial";
        return () => {
            document.title = "Synthesis AI Lab";
        };
    }, []);

    const scrollToTutorial = () => {
        howItWorksRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToSteps = () => {
        tutorialSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const updateTabStep = useCallback((tabKey, step) => {
        setTabSteps(prev => ({ ...prev, [tabKey]: step }));
    }, []);

    // How It Works icon -> [tab, step]
    const BIG_PICTURE_TARGETS = [['1', 0], ['2', 0], ['3', 0], ['4', 1], ['4', 3], ['4', 4]];

    const handleBigPictureClick = (index) => {
        const [targetTab, targetStep] = BIG_PICTURE_TARGETS[index] || ['1', 0];

        setActiveTab(targetTab);
        setTargetStepMap(prev => ({ ...prev, [targetTab]: targetStep }));
        setTimeout(() => {
            setTargetStepMap(prev => ({ ...prev, [targetTab]: null }));
        }, 500);
    };

    const getActiveBigPictureStep = () => {
        if (activeTab === '1') return 0;
        if (activeTab === '2') return 1;
        if (activeTab === '3') return 2;
        if (activeTab === '4') {
            const step = tabSteps['4'];
            if (step <= 1) return 3;
            if (step <= 3) return 4;
            return 5;
        }
        return -1;
    };

    const handleNextTab = useCallback(() => {
        setActiveTab(prev => {
            const nextKey = parseInt(prev) + 1;
            if (nextKey <= 4) {
                scrollToTutorial();
                return String(nextKey);
            }
            return prev;
        });
    }, []);

    const handlePrevTab = useCallback(() => {
        setActiveTab(prev => {
            const prevKey = parseInt(prev) - 1;
            if (prevKey >= 1) {
                scrollToTutorial();
                return String(prevKey);
            }
            return prev;
        });
    }, []);

    const items = useMemo(() => [
        {
            key: '1',
            label: 'Get Started',
            children: <StepViewer steps={getStartedSteps} onNextTab={handleNextTab} isActive={activeTab === '1'} onStepChange={(s) => updateTabStep('1', s)} targetStep={targetStepMap['1']} />,
        },
        {
            key: '2',
            label: 'Course Setup',
            children: <StepViewer steps={courseSetupSteps} onNextTab={handleNextTab} onPrevTab={handlePrevTab} isActive={activeTab === '2'} onStepChange={(s) => updateTabStep('2', s)} targetStep={targetStepMap['2']} />,
        },
        {
            key: '3',
            label: 'Annotation Space',
            children: <StepViewer steps={annotationSteps} onNextTab={handleNextTab} onPrevTab={handlePrevTab} isActive={activeTab === '3'} onStepChange={(s) => updateTabStep('3', s)} targetStep={targetStepMap['3']} />,
        },
        {
            key: '4',
            label: 'Synthesis Canvas',
            children: <StepViewer steps={synthesisCanvasSteps} onPrevTab={handlePrevTab} isActive={activeTab === '4'} onStepChange={(s) => updateTabStep('4', s)} targetStep={targetStepMap['4']} />,
        },
    ], [handleNextTab, handlePrevTab, activeTab, updateTabStep, targetStepMap]);

    const renderTabBar = useCallback((props, DefaultTabBar) => (
        <div style={{
            position: 'sticky',
            top: 0,
            zIndex: 10,
            background: colorBgContainer,
        }}>
            <DefaultTabBar {...props} style={{ marginBottom: 0 }} />
        </div>
    ), [colorBgContainer]);

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#4f46e5',
                },
            }}
        >
            <Layout style={{ height: '100vh', background: '#fff' }}>
            <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)', padding: '0 24px', borderBottom: '1px solid #f0f0f0', zIndex: 100 }}>
                <div style={{ color: '#001529', fontSize: '1.2rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 10 }}>
                    Synthesis AI Lab <span style={{ fontWeight: 'normal', fontSize: '0.9rem', color: '#888', marginLeft: 8 }}>Tutorial</span>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                    {screens.sm && (
                        <Button icon={<ExperimentOutlined />} onClick={() => window.location.href = APP_URL}>
                            Try the Demo
                        </Button>
                    )}
                    <Button type="primary" icon={<RocketOutlined />} onClick={() => window.location.href = APP_URL}>
                        Launch App
                    </Button>
                </div>
            </Header>

            <Content style={{ overflowY: 'auto', scrollBehavior: 'smooth' }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '60px 20px 0',
                    background: 'linear-gradient(180deg, #f0f5ff 0%, #f8fafc 100%)',
                    minHeight: 'min(calc(100vh - 60px), auto)',
                    overflow: 'hidden'
                }}>
                    <div style={{ textAlign: 'center', maxWidth: 800, marginBottom: 40 }}>
                        <Title level={1} style={{ fontSize: '2.8rem', marginBottom: 16, letterSpacing: '-0.5px', fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}>
                            SAIL: <span style={{ color: '#4f46e5' }}> Synthesis</span> AI Lab
                        </Title>
                        <Paragraph style={{ fontSize: '1.2rem', color: '#585858', lineHeight: 1.6, marginBottom: 8 }}>
                            Connect ideas. Synthesize knowledge. Spark creative knowledge work.
                        
                        </Paragraph>
                         <Paragraph style={{ fontSize: '1rem', color: '#585858', marginTop: 0 }}>
                           Grounded in Learning Sciences and HCI research. 
                        </Paragraph>                       
                        
                        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginTop: 40 }}>
                            <Button
                                type="primary"
                                size="middle"
                                shape="round"
                                icon={<PlayCircleOutlined />}
                                onClick={scrollToTutorial}
                                style={{ height: 40, padding: '0 25px', fontSize: 15, boxShadow: '0 2px 8px rgba(22, 20, 58, 0.2)', fontWeight: 500 }}
                            >
                                Start Tutorial
                            </Button>
                            <Button
                                type="default"
                                size="middle"
                                shape="round"
                                icon={<RocketOutlined />}
                                onClick={() => window.location.href = APP_URL}
                                style={{ height: 40, padding: '0 25px', fontSize: 15, borderColor: '#4f46e5', color: '#4f46e5', fontWeight: 500 }}
                            >
                                Launch App
                            </Button>
                            <Button
                                type="default"
                                size="middle"
                                shape="round"
                                icon={<ExperimentOutlined />}
                                onClick={() => window.location.href = APP_URL}
                                style={{ height: 40, padding: '0 25px', fontSize: 15, borderColor: '#4f46e5', color: '#4f46e5', fontWeight: 500 }}
                            >
                                Try the Demo
                            </Button>
                        </div>
                        <Paragraph style={{ fontSize: '0.95rem', color: '#999', marginTop: 24 }}>
                            Interested in a demo? <a href="mailto:xrzhu@illinois.edu" style={{ color: '#4f46e5', textDecoration: 'none' }}>Get in touch</a>
                        </Paragraph>
                    </div>

                    <div style={{
                        width: '100%',
                        maxWidth: 'min(1280px, 180vh)',
                        borderRadius: '16px 16px 0 0',
                        overflow: 'hidden',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
                        border: '4px solid rgba(255,255,255,0.8)',
                        borderBottom: 'none',
                        position: 'relative',
                        background: '#e6f4ff',
                        marginBottom: -20
                    }}>
                        <img
                            src={landingImage}
                            alt="Synthesis AI Lab Dashboard Interface"
                            style={{ width: '100%', height: 'auto', display: 'block' }}
                            onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.parentNode.innerHTML = '<div style="padding: 100px; text-align: center; color: #4f46e5; font-size: 1.5rem;">Dashboard Preview Image</div>';
                            }}
                        />
                    </div>
                </div>

                <ProjectBigPicture innerRef={howItWorksRef} activeStep={getActiveBigPictureStep()} onStepClick={handleBigPictureClick} />

                <div ref={tutorialSectionRef} style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ background: colorBgContainer, flex: 1, margin: '0 auto', width: '100%', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>

                        <Tabs
                            activeKey={activeTab}
                            onChange={setActiveTab}
                            items={items}
                            size="large"
                            centered={screens.md}
                            renderTabBar={renderTabBar}
                        />
                    </div>
                </div>

                <TeamSection />

                <Footer style={{ textAlign: 'center', background: '#f8f9fa', padding: '40px 20px' }}>
                    <Paragraph style={{ marginBottom: 8 }}>
                        Synthesis AI Lab ©{new Date().getFullYear()}
                    </Paragraph>

                </Footer>
            </Content>
            </Layout>
        </ConfigProvider>
    );
};

export default Tutorial;