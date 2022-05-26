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
import { I${capitalize(inputs.name)}Props } from ".";

import styles from "./${lowerize(inputs.name)}.module.scss"

export const ${capitalize(inputs.name)} = (props: I${capitalize(inputs.name)}Props): JSX.Element => {
    return (<div className={styles.${lowerize(inputs.name)}}>
        Hello World ${inputs.name}!!!
    </div>);
};`
                    },
                    {
                        type: 'file',
                        name: inputs => `${lowerize(inputs.name)}.types.ts`,
                        content: inputs => `export interface I${capitalize(inputs.name)}Props { }`
                    },
                    {
                        type: 'file',
                        name: inputs => `index.ts`,
                        content: inputs => `export * from "./${lowerize(inputs.name)}";
export * from "./${lowerize(inputs.name)}.types";`
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
