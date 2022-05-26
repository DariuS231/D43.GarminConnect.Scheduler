import * as vsc from 'vsc-base';
import { lowerize, capitalize } from "./common"

export function Template(path: string, templatePath: string): vsc.vscTemplate {
    return {
        userInputs: [
            {
                title: 'What is the Component Name',
                argumentName: 'name', // will become input in template
                defaultValue: 'test'
            }
        ],
        template: [
            {
                type: 'folder',
                name: inputs => `${lowerize(inputs.name)}`,
                children: [
                    {
                        type: 'file',
                        name: inputs => `${lowerize(inputs.name)}.tsx`,
                        content: inputs => `import * as React from "react";
import { ${capitalize(inputs.name)}Context } from ".";
import styles from "./${lowerize(inputs.name)}.module.scss"

export const ${capitalize(inputs.name)} = (): JSX.Element => {
    const { state } = React.useContext(${capitalize(inputs.name)}Context);

    return (<div className={styles.${lowerize(inputs.name)}}>
        Hello {state.${lowerize(inputs.name)}Value}
    </div>);
};`
                    },
                    {
                        type: 'file',
                        name: inputs => `${lowerize(inputs.name)}.types.ts`,
                        content: inputs => `export interface I${capitalize(inputs.name)}Context {
state: { ${lowerize(inputs.name)}Value: string };
actions: { set: (newValue: string) => void; };
}

export interface I${capitalize(inputs.name)}Props { }`
                    },
                    {
                        type: 'file',
                        name: inputs => `${lowerize(inputs.name)}.provider.tsx`,
                        content: inputs => `import * as React from "react";
import { ${capitalize(inputs.name)}Context, I${capitalize(inputs.name)}Props } from ".";

export const ${capitalize(inputs.name)}Provider = (props: React.PropsWithChildren<I${capitalize(inputs.name)}Props>): JSX.Element => {
const [${lowerize(inputs.name)}Value, set${capitalize(inputs.name)}Value] = React.useState("");

const set = React.useCallback((newValue: string) => { set${capitalize(inputs.name)}Value(newValue); }, []);
const value = {
    state: { ${lowerize(inputs.name)}Value },
    actions: { set },
};

return (<${capitalize(inputs.name)}Context.Provider value={value}>
    {props.children}
</${capitalize(inputs.name)}Context.Provider>);
};`
                    },
                    {
                        type: 'file',
                        name: inputs => `${lowerize(inputs.name)}.context.ts`,
                        content: inputs => `import { createContext } from "react";
import { I${capitalize(inputs.name)}Context } from ".";
export const ${capitalize(inputs.name)}Context = createContext({} as I${capitalize(inputs.name)}Context);`
                    },
                    {
                        type: 'file',
                        name: inputs => `index.ts`,
                        content: inputs => `export * from "./${lowerize(inputs.name)}";
export * from "./${lowerize(inputs.name)}.types";
export * from "./${lowerize(inputs.name)}.provider";
export * from "./${lowerize(inputs.name)}.context";`
                    },
                    {
                        type: 'file',
                        name: inputs => `${lowerize(inputs.name)}.module.scss`,
                        content: inputs => `.${lowerize(inputs.name)} {
position: inherit;
}`
                    }
                ]
            }
        ]
    }
}