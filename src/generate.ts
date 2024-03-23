import {poeUrlEncode} from './decode';
import {data} from './parse';

const POE_CLASSES = ['scion', 'marauder', 'ranger', 'witch', 'duelist', 'templar', 'shadow'];
const TREE_URL_PREFIX = 'https://www.pathofexile.com/fullscreen-passive-skill-tree/3.23.0/';
const randomValue = <T>(values: T[]): T => values[Math.floor(Math.random() * values.length)];

const targetNodes = +process.argv[2];
if (!Number.isFinite(targetNodes)) throw new Error('Missing argument for number of nodes to generate');

export const generateSkillTree = (nodes: number) => {
    const tree = [randomValue(data.nodes.root.out)];
    let depth = 0;

    while (tree.length < nodes) {
        const last = data.nodes[tree[depth]];
        const candidates = [...last.out, ...last.in]
            .filter(id => !data.nodes[id].ascendancyName)
            .filter(id => !tree.includes(id));
        if (!candidates.length) {
            depth--; // backtrack to node with viable neighbor
            continue;
        }

        tree.push(randomValue(candidates));
        depth = tree.length - 1;
    }

    const classIdx = data.nodes[tree[0]].classStartIndex;
    const treeUrl = TREE_URL_PREFIX + poeUrlEncode(classIdx, tree);
    console.log(`Generated a ${targetNodes} skill point ${POE_CLASSES[classIdx]} tree: ${treeUrl}`);
    return treeUrl;
};

generateSkillTree(targetNodes);
