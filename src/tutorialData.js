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
                description: 'Click "Login" to sign in, or "Sign up" to create an account. No account yet? Click "Try the Demo" to explore an example course as an instructor or a student.'
            },
            {
                image: asset('1_get_started/2_join_course.png'),
                title: 'Join Your Course',
                description: 'Click "Join Course by Code" and enter the invite code shared by your instructor.'
            },
            {
                image: asset('1_get_started/3_course_modules.png'),
                title: 'Courses & Modules',
                description: [
                    'Your courses appear in the left panel. Open one to see its modules.',
                    'Each module shows its Synthesis Prompt (the writing task you are working toward) and its readings.',
                    'Click "Annotate" to read and discuss, or "Synthesize" to open the Synthesis Canvas.'
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
                title: 'Highlight & Start a Thread',
                description: 'Select a passage in the reading and click "Add Annotation". Write your comment to start a discussion thread on that passage.'
            },
            {
                image: asset('2_social_annotation/2_peer_reply.png'),
                title: 'Reply to Peers',
                description: 'Click "Reply" to respond to a classmate. Threads build up next to the reading, and they become the raw material for your group\'s Synthesis Graph.'
            }
        ]
    },
    {
        key: 'realtime-collaboration',
        label: ['Realtime Collaboration', 'with Peers'],
        title: 'Realtime Collaboration with Peers',
        steps: [
            {
                image: asset('3_realtime_collaboration/1_realtime.png'),
                title: 'Work Together in Real Time',
                description: [
                    'The Synthesis Canvas has three panels: the **Synthesis Graph**, the **Group Chat**, and the **Synthesis Editor**.',
                    'All three are shared with your group in real time. You see your teammates\' cursors in the graph and in the editor, and every edit and message shows up for everyone right away.',
                    'Panels can be resized or collapsed.'
                ]
            }
        ]
    },
    {
        key: 'synthesis-graph',
        label: ['Knowledge Synthesis', 'Graph'],
        title: 'Synthesis Graph',
        steps: [
            {
                image: asset('4_synthesis_graph/1_overview.png'),
                title: 'Synthesis Graph',
                description: [
                    'SAIL builds the graph from your group\'s annotations: each discussion thread is linked to the claims it supports or challenges, and claims can be grouped into higher-level key points.',
                    'The graph is your group\'s shared map of the argument. It is a starting point for the synthesis, not the final answer.'
                ]
            },
            {
                image: asset('4_synthesis_graph/2_detail.png'),
                title: 'Explore & Refine the Graph',
                description: [
                    'Zoom in to read the threads behind each claim and how each one relates to it.',
                    'Add or merge nodes, drag a comment onto a claim to connect them, and leave notes to explain your reasoning.'
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
                title: 'Group Chat with AI Agents',
                description: [
                    'Messages go to your teammates.',
                    '**Discussion Partner**: an open-ended thinking partner.',
                    '**Idea Finder**: finds what your group already said, with links back to each annotation.',
                    '**Idea Builder**: helps you connect and advance your ideas.'
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
                description: 'The editor is one shared document. Everyone in your group writes in the same draft at the same time, and you can see where your teammates are typing.'
            },
            {
                image: asset('6_synthesis_editor/2_cite.png'),
                title: 'Cite Your Ideas',
                description: 'In the Synthesis Editor, type "/" to cite a Claim or an annotation. Click a citation chip to highlight it in the graph.'
            },
            {
                image: asset('6_synthesis_editor/3_quote.png'),
                title: 'Quote in Chat',
                description: 'Select text in the draft and click "Quote in chat" to bring it into the Group Chat, so you can discuss a passage with your teammates or ask an AI agent about it.'
            }
        ]
    }
];
