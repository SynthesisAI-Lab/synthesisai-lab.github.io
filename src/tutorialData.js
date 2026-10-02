// Preload tutorial images via Vite glob so they are included in the build and work with a dynamic lookup.
const images = import.meta.glob('./assets/tutorial_assets/v2/**/*.{png,jpg,jpeg}', { eager: true, import: 'default' });
const asset = (path) => images[`./assets/tutorial_assets/v2/${path}`];

export const getStartedSteps = [
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
];

export const courseSetupSteps = [
    {
        image: asset('2_course_setup/1_new_course.png'),
        title: 'Create a Course',
        description: 'Click "New Course" on the home page, then give the course a name and an optional description.'
    },
    {
        image: asset('2_course_setup/2_members_groups.png'),
        title: 'Members & Groups',
        description: [
            'Open "Members and Groups" to copy the course invite code, or a ready-made invite message, for your students.',
            'Create groups and assign students to them. In a group module, each group keeps its own graph, chat, and draft.'
        ]
    },
    {
        image: asset('2_course_setup/3_module_customization.png'),
        title: 'Module Customization',
        description: [
            'Click "New Module" for each synthesis task, then open "Customization".',
            '**Collaboration Type**: students work in groups or as one class.',
            '**AI Agents**: choose which agents students can @-mention. Discussion Partner is always available.',
            'Add the **Synthesis Prompt** on the module card, and **Guiding Questions** on each reading.'
        ]
    },
    {
        image: asset('2_course_setup/4_upload_reading.png'),
        title: 'Upload Readings',
        description: 'Click "New Reading" and drop in a PDF. SAIL reads the title and authors from the file for you to check, then extracts the full text and generates an AI summary.'
    }
];

export const annotationSteps = [
    {
        image: asset('3_annotation_space/1_highlight_thread.png'),
        title: 'Highlight & Start a Thread',
        description: 'Select a passage in the reading and click "Add Annotation". Write your comment to start a discussion thread on that passage.'
    },
    {
        image: asset('3_annotation_space/2_peer_reply.png'),
        title: 'Reply to Peers',
        description: 'Click "Reply" to respond to a classmate. Threads build up next to the reading, and they become the raw material for your group\'s Synthesis Graph.'
    }
];

export const synthesisCanvasSteps = [
    {
        image: asset('4_synthesis_canvas/1_overview.png'),
        title: 'Synthesis Canvas Overview',
        description: [
            '**Synthesis Graph** (left): your group\'s shared argument, built from your annotations.',
            '**Group Chat** (middle): talk with teammates and AI agents.',
            '**Synthesis Editor** (right): co-write the synthesis draft.',
            'Panels can be resized or collapsed.'
        ]
    },
    {
        image: asset('4_synthesis_canvas/2_graph_structure.png'),
        title: 'Synthesis Graph Structure',
        description: [
            '**Claims** are the arguments your group is advancing. **Key Points** are higher-level ideas that rise above several claims.',
            '**Annotation Threads** hold your discussions, and each comment links to a Claim or Key Point.',
            'Every link is an **epistemic relation**. Its Stance is "+ build toward" or "− push back", and its Function is Ground, Explain & Elaborate, New Idea, or Question.',
            'Click a link, or drag a comment onto a node, to edit the relation and add a **Synthesis Note**.'
        ]
    },
    {
        image: asset('4_synthesis_canvas/3_collaboration_history.png'),
        title: 'Real-time Collaboration & Edit History',
        description: 'Edit the graph together: you see teammates\' cursors and changes live. Click "History" to see every change, who made it, and when.'
    },
    {
        image: asset('4_synthesis_canvas/4_group_chat_agents.png'),
        title: 'Group Chat with AI Agents',
        description: [
            'Messages go to your teammates. An AI agent replies only when you @-mention it.',
            '**Discussion Partner**: an open-ended thinking partner.',
            '**Idea Finder**: finds what your group already said, with links back to each annotation.',
            '**Idea Builder**: helps you connect, advance, and check your ideas against the task.'
        ]
    },
    {
        image: asset('4_synthesis_canvas/5_citation_chips.png'),
        title: 'Cite Your Ideas in the Synthesis',
        description: 'In the Synthesis Editor, type "/" to cite a Claim or an annotation. Click a citation chip to highlight it in the graph.'
    }
];
