import React, { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { AnimatePresence, motion as Motion } from 'motion/react';
import {
    ExportOutlined, PlayCircleOutlined, CaretRightOutlined, LeftOutlined, RightOutlined, ArrowRightOutlined,
    CommentOutlined, DeploymentUnitOutlined, EditOutlined, LoginOutlined, TeamOutlined,
    HighlightOutlined, ExperimentOutlined,
} from '@ant-design/icons';
import { sections } from './tutorialData';
import TeamSection from './TeamSection';

const APP_URL = 'http://74.249.196.43/v2/';

const landingImage = new URL('./assets/tutorial_assets/v2/landing_page.png', import.meta.url).href;
// Served as-is from public/, so the URL stays stable across builds.
const VIDEO_URL = `${import.meta.env.BASE_URL}video/sail_overview.mp4`;
const VIDEO_POSTER = `${import.meta.env.BASE_URL}video/sail_overview-poster.jpg`;
const LOGO_URL = `${import.meta.env.BASE_URL}favicon.svg`;

const SECTION_ICONS = [
    <LoginOutlined />, <HighlightOutlined />, <TeamOutlined />,
    <DeploymentUnitOutlined />, <CommentOutlined />, <EditOutlined />,
];

// Every step of every section, in one sequence.
const STEPS = sections.flatMap((section, sectionIndex) =>
    section.steps.map((step) => ({ ...step, sectionIndex }))
);
const SECTION_START = sections.map((_, sectionIndex) =>
    STEPS.findIndex((step) => step.sectionIndex === sectionIndex)
);

const parseBoldText = (text) =>
    text.split(/(\*\*.*?\*\*)/).map((part, idx) =>
        part.startsWith('**') && part.endsWith('**')
            ? <strong key={idx} className="font-semibold text-ink">{part.slice(2, -2)}</strong>
            : <React.Fragment key={idx}>{part}</React.Fragment>
    );

const Header = () => (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:h-16 sm:px-5">
            <a href="/" className="flex items-center gap-2.5 text-lg font-bold tracking-tight whitespace-nowrap text-gray-900">
                <img src={LOGO_URL} alt="" className="size-7" />
                SAIL <span className="hidden font-normal md:inline">- Synthesis AI Lab</span>
            </a>
            <div className="flex items-center gap-2">
                <a href={APP_URL} className="btn-ghost hidden h-9 px-4 text-sm whitespace-nowrap sm:inline-flex">
                    <ExperimentOutlined /> Try the Demo
                </a>
                <a href={APP_URL} className="btn-primary h-9 px-4 text-sm whitespace-nowrap">
                    <ExportOutlined /> Launch App
                </a>
            </div>
        </div>
    </header>
);

const Hero = ({ onStart }) => (
    <section className="overflow-hidden bg-linear-to-b from-[#f0f5ff] to-[#f8fafc] px-5 pt-10 sm:pt-16">
        <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-heading text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                SAIL: <span className="text-brand">Synthesis</span> AI Lab
            </h1>
            <p className="mt-4 text-base text-gray-600 sm:mt-5 sm:text-lg md:text-xl">
                Connect ideas. Synthesize knowledge. Spark creative knowledge work.
            </p>
            <p className="mt-2 text-sm text-gray-500 sm:text-base">
                Grounded in Learning Sciences and HCI research.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-2.5 sm:mt-10 sm:gap-3">
                <button type="button" onClick={onStart} className="btn-outline h-10 px-5 text-sm sm:h-11 sm:px-6 sm:text-[15px]">
                    <PlayCircleOutlined /> Start Tutorial
                </button>
                <a href={APP_URL} className="btn-outline h-10 px-5 text-sm sm:h-11 sm:px-6 sm:text-[15px]">
                    <ExportOutlined /> Launch App
                </a>
                <a href={APP_URL} className="btn-outline h-10 px-5 text-sm sm:h-11 sm:px-6 sm:text-[15px]">
                    <ExperimentOutlined /> Try the Demo
                </a>
            </div>
            <p className="mt-6 text-sm text-gray-400">
                Interested in a demo?{' '}
                <a href="mailto:xrzhu@illinois.edu" className="text-brand hover:underline">Get in touch</a>
            </p>
        </div>

        <Motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="relative mx-auto mt-10 -mb-5 w-full max-w-[min(1280px,180vh)] overflow-hidden rounded-t-xl border-2 border-b-0 border-white/80 bg-brand-light shadow-[0_20px_60px_rgba(15,23,42,0.15)] sm:mt-14 sm:rounded-t-2xl sm:border-4"
        >
            <img src={landingImage} alt="Synthesis AI Lab Synthesis Canvas" className="block h-auto w-full" />
        </Motion.div>
    </section>
);

// Poster + play button until the visitor clicks, so the video (~15 MB) is
// only downloaded on demand.
const VideoSection = () => {
    const [playing, setPlaying] = useState(false);
    const videoRef = useRef(null);

    const play = () => {
        setPlaying(true);
        requestAnimationFrame(() => videoRef.current?.play());
    };

    return (
        <section className="bg-white px-4 pt-14 pb-4 sm:px-5 sm:pt-20 sm:pb-6">
            <div className="mx-auto max-w-5xl text-center">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">See SAIL in Action</h2>
                <div className="relative mt-6 aspect-video sm:mt-8 overflow-hidden rounded-2xl bg-gray-900 shadow-[0_20px_60px_rgba(15,23,42,0.18)] ring-1 ring-gray-200/80">
                    <video
                        ref={videoRef}
                        src={VIDEO_URL}
                        poster={VIDEO_POSTER}
                        controls={playing}
                        preload="none"
                        playsInline
                        className="block h-full w-full object-cover"
                    />
                    {!playing && (
                        <button
                            type="button"
                            onClick={play}
                            aria-label="Play video"
                            className="group absolute inset-0 flex cursor-pointer items-center justify-center bg-gray-900/10 transition-colors hover:bg-gray-900/20"
                        >
                            <span className="flex size-14 items-center justify-center rounded-full bg-white/95 text-2xl text-brand sm:size-20 sm:text-3xl shadow-xl transition-transform duration-200 group-hover:scale-105">
                                <CaretRightOutlined className="ml-1" />
                            </span>
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
};

const HowItWorks = ({ innerRef, activeSection, onSelect }) => (
    <section ref={innerRef} className="scroll-mt-14 bg-white px-4 pt-12 pb-4 sm:scroll-mt-16 sm:px-5 sm:pt-14 sm:pb-6">
        <div className="mx-auto max-w-5xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">How It Works</h2>
            <div className="mt-8 grid grid-cols-3 gap-x-1 gap-y-5 sm:mt-10 md:flex md:items-start md:justify-center md:gap-1">
                {sections.map((section, index) => {
                    const active = index === activeSection;
                    return (
                        <React.Fragment key={section.key}>
                            <button
                                type="button"
                                onClick={() => onSelect(index)}
                                aria-current={active ? 'step' : undefined}
                                className="group flex w-full cursor-pointer flex-col items-center gap-2 justify-self-center text-center sm:w-[7.5rem] sm:gap-2.5 md:w-32"
                            >
                                <span
                                    className={`flex size-14 items-center justify-center rounded-full text-2xl transition-all duration-300 sm:size-[68px] sm:text-3xl ${
                                        active
                                            ? 'scale-105 bg-brand text-white shadow-lg shadow-brand/30'
                                            : 'bg-gray-100 text-brand group-hover:bg-brand-light'
                                    }`}
                                >
                                    {SECTION_ICONS[index]}
                                </span>
                                <span className={`text-xs leading-snug sm:text-[13px] ${active ? 'font-semibold text-gray-900' : 'text-gray-600'}`}>
                                    {section.label[0]}<br />{section.label[1]}
                                </span>
                            </button>
                            {index < sections.length - 1 && (
                                <span className="hidden h-[68px] items-center text-gray-300 md:flex">
                                    <ArrowRightOutlined />
                                </span>
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    </section>
);

const slide = {
    initial: (d) => ({ opacity: 0, x: 24 * d }),
    animate: { opacity: 1, x: 0 },
    exit: (d) => ({ opacity: 0, x: -24 * d }),
};

const StepViewer = ({ index, onChange }) => {
    const step = STEPS[index];
    const [direction, setDirection] = useState(1);

    const go = useCallback((next) => {
        if (next < 0 || next >= STEPS.length) return;
        setDirection(next > index ? 1 : -1);
        onChange(next);
    }, [index, onChange]);

    useEffect(() => {
        const onKey = (e) => {
            const tag = document.activeElement?.tagName;
            if (tag === 'INPUT' || tag === 'TEXTAREA') return;
            if (e.key === 'ArrowRight') go(index + 1);
            if (e.key === 'ArrowLeft') go(index - 1);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [go, index]);

    const transition = { duration: 0.25, ease: 'easeOut' };

    return (
        <section className="bg-white px-4 py-6 sm:px-5 sm:py-10">
            <div className="mx-auto grid max-w-6xl items-center gap-6 sm:gap-10 lg:grid-cols-12">
                <div className="lg:col-span-7">
                    <div className="aspect-[9/5] overflow-hidden rounded-xl bg-gray-100 shadow-[0_20px_40px_rgba(15,23,42,0.08)] ring-1 ring-gray-200/80">
                        <AnimatePresence mode="wait" custom={direction} initial={false}>
                            <Motion.img
                                key={index}
                                custom={direction}
                                variants={slide}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                transition={transition}
                                src={step.image}
                                alt={step.title}
                                className="block h-full w-full object-cover object-top"
                            />
                        </AnimatePresence>
                    </div>
                </div>

                <div className="lg:col-span-5 lg:pl-6">
                    <AnimatePresence mode="wait" custom={direction} initial={false}>
                        <Motion.div
                            key={index}
                            custom={direction}
                            variants={slide}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={transition}
                        >
                            <h3 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">{step.title}</h3>
                            {Array.isArray(step.description) ? (
                                <ol className="mt-4 list-decimal space-y-2 pl-5 text-[15px] leading-relaxed text-gray-600">
                                    {step.description.map((item, i) => <li key={i}>{parseBoldText(item)}</li>)}
                                </ol>
                            ) : (
                                <p className="mt-4 text-[15px] leading-relaxed text-gray-600">{parseBoldText(step.description)}</p>
                            )}
                        </Motion.div>
                    </AnimatePresence>

                    <div className="mt-6 flex items-center gap-4 sm:mt-8">
                        <button type="button" className="btn-icon" onClick={() => go(index - 1)} disabled={index === 0} aria-label="Previous step">
                            <LeftOutlined />
                        </button>
                        <span className="text-sm text-gray-400 tabular-nums">{index + 1} / {STEPS.length}</span>
                        <button type="button" className="btn-icon" onClick={() => go(index + 1)} disabled={index === STEPS.length - 1} aria-label="Next step">
                            <RightOutlined />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Tutorial = () => {
    const [stepIndex, setStepIndex] = useState(0);
    const howItWorksRef = useRef(null);

    useEffect(() => {
        document.title = 'SAIL - Synthesis AI Lab';
    }, []);

    const activeSection = useMemo(() => STEPS[stepIndex].sectionIndex, [stepIndex]);

    const scrollToHowItWorks = () => howItWorksRef.current?.scrollIntoView({ behavior: 'smooth' });

    const selectSection = (sectionIndex) => setStepIndex(SECTION_START[sectionIndex]);

    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main>
                <Hero onStart={scrollToHowItWorks} />
                <VideoSection />
                <HowItWorks innerRef={howItWorksRef} activeSection={activeSection} onSelect={selectSection} />
                <StepViewer index={stepIndex} onChange={setStepIndex} />
                <TeamSection />
            </main>
            <footer className="border-t border-gray-100 bg-gray-50 px-5 py-10 text-center text-sm text-gray-500">
                Synthesis AI Lab ©{new Date().getFullYear()}
            </footer>
        </div>
    );
};

export default Tutorial;
