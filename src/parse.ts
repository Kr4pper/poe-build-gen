import {readFileSync} from 'fs';
import {join} from 'path';

interface Class {
    name: string;
    base_str: number;
    base_dex: number;
    base_int: number;
    ascendancies: {id: string; name: string;}[];
}

interface Group {
    x: number;
    y: number;
    orbits: number[];
    nodes: `${number}`[];
}

interface Node {
    name: string;
    isNotable?: boolean;
    ascendancyName?: string;
    stats: string[];
    classStartIndex?: number;
    reminderText?: string[];
    group: number;
    orbit: number;
    orbitIndex: number;
    out: `${number}`[];
    in: `${number}`[];
}

interface TreeJSON {
    tree: string;
    classes: Class[];
    groups: {[key: `${number}`]: Group;};
    nodes: {root: {out: `${number}`[]}; [key: `${number}`]: Node;};
    jewelSlots: number[];
    points: {totalPoints: number; ascendancyPoints: number;};
}

export const data: TreeJSON = JSON.parse(readFileSync(join(__dirname, 'data.json'), {encoding: 'utf-8'}));
