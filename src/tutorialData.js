// Preload tutorial images via Vite glob so they are included in the build and work with a dynamic lookup.
const images = import.meta.glob('./assets/tutorial_assets/v2/**/*.{png,jpg,jpeg}', { eager: true, import: 'default' });
const asset = (path) => images[`./assets/tutorial_assets/v2/${path}`];

// One entry per "How It Works" icon. `label` is shown under the icon,
// `title` is the heading above the steps.
export const sections = [
    {
        key: 'get-started',
        label: ['Join', 'a Course'],
        title: 'Get Started',
        steps: [
            {
                image: asset('1_get_started/1_sign_in.png'),
                title: 'Sign In or Try the Demo',
                description: [
                    'Login or Sign up to SAIL.',
                    'Click "Try the Demo" to explore an example course.'
                ]
            },
            {
                image: asset('1_get_started/2_join_course.png'),
                title: 'Join Your Course',
                description: 'Enter the invite code shared by your instructor to join a course.'
            },
            {
                image: asset('1_get_started/3_course_modules.png'),
                title: 'Courses & Modules',
                description: [
                    'Open course on the left to view its modules.',
                    'Check the modules for readings and additional requirements.',
                    'Click "Annotate" to read and discuss, or "Synthesize" to enter Synthesis Canvas.'
                ]
            }
        ]
    },
    {
        key: 'social-annotation',
        label: ['Social', 'Annotation'],
        title: 'Social Annotation',
        steps: [
            {
                image: asset('2_social_annotation/1_highlight_thread.png'),
                title: 'Highlight & Discuss in Thread',
                description: 'Highlight a passage in the reading and start a discussion thread.'
            },
            {
                image: asset('2_social_annotation/2_peer_reply.png'),
                title: 'Reply to Peers',
                description: 'Respond to a peer\'s comment, ask questions, and continue the discussion.'
            }
        ]
    },
    {
        key: 'realtime-collaboration',
        label: ['Realtime', 'Collaboration'],
        title: 'Realtime Collaboration with Peers',
        steps: [
            {
                image: asset('3_realtime_collaboration/1_realtime.png'),
                title: 'Work Together in Real Time',
                description: [
                    'Three panels wrok together: **Synthesis Graph**, **Group Chat**, and **Synthesis Editor**.',
                    'All shared with your group in real time. You see your teammates\' cursors in the graph and in the editor, and every edit and message shows up for everyone right away.',
                    'Panels can be resized or collapsed.'
                ]
            }
        ]
    },
    {
        key: 'synthesis-graph',
        label: ['Synthesis', 'Graph'],
        title: 'Synthesis Graph',
        steps: [
            {
                image: asset('4_synthesis_graph/1_overview.png'),
                title: 'Synthesis Graph',
                description: [
                    'SAIL builds the graph from your group\'s annotations to visualize your thinking.',
                    'The graph is a starting point for the synthesis.'
                ]
            },
            {
                image: asset('4_synthesis_graph/2_detail.png'),
                title: 'Explore & Refine the Graph',
                description: [
                    'Zoom in to read the threads behind each claim and how each one relates to it.',
                    'Add or merge nodes, modify relations, and leave notes to explain your reasoning.'
                ]
            }
        ]
    },
    {
        key: 'group-ai-chat',
        label: ['Group &', 'AI Chat'],
        title: 'Group & AI Chat',
        steps: [
            {
                image: asset('5_group_ai_chat/1_group_chat.png'),
                title: 'Group & AI Agent Chat',
                description: [
                    'Chat with your group members and AI agents.',
                    '**Discussion Partner**: an open-ended thinking partner.',
                    '**Idea Finder**: finds what\'s in the annotations and the Synthesis Graph to ground your ideas.',
                    '**Idea Builder**: helps you connect and advance your ideas, and check your collaborative progress.'
                ]
            }
        ]
    },
    {
        key: 'synthesis-editor',
        label: ['Co-write', 'the Synthesis'],
        title: 'Synthesis Editor',
        steps: [
            {
                image: asset('6_synthesis_editor/1_cowrite.png'),
                title: 'Write Together',
                description: 'One shared document where your group writes in the same draft, and you can see where your teammates are typing.'
            },
            {
                image: asset('6_synthesis_editor/2_cite.png'),
                title: 'Cite Your Ideas',
                description: 'Type "/" to cite a Claim or an annotation. Click a citation chip to highlight it in the graph.'
            },
            {
                image: asset('6_synthesis_editor/3_quote.png'),
                title: 'Quote in Chat',
                description: 'Select text in the draft and click "Quote in chat" to bring it into the Group Chat, so you can discuss a passage with your teammates or ask an AI agent about it.'
            }
        ]
    }
];
