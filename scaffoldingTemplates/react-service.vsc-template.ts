import * as vsc from 'vsc-base';
import { lowerize, capitalize } from "./common"

export function Template(path: string, templatePath: string): vsc.vscTemplate {
    return {
        userInputs: [
            {
                title: 'What is the Service Name',
                argumentName: 'name', // will become input in template
                defaultValue: 'test'
            }
        ],
        template: [
            {
                type: 'folder',
                name: inputs => `${lowerize(inputs.name)}Service`,
                children: [
                    {
                        type: 'file',
                        name: inputs => `${lowerize(inputs.name)}Service.ts`,
                        content: inputs => `import { ServiceKey, ServiceScope } from '@microsoft/sp-core-library';
import { I${capitalize(inputs.name)}Service } from ".";

export class ${capitalize(inputs.name)}Service implements I${capitalize(inputs.name)}Service {

    public static readonly serviceKey: ServiceKey<I${capitalize(inputs.name)}Service> =
        ServiceKey.create<I${capitalize(inputs.name)}Service>('mm:I${capitalize(inputs.name)}Service', ${capitalize(inputs.name)}Service);

    constructor(serviceScope: ServiceScope) { }
}`
                    },
                    {
                        type: 'file',
                        name: inputs => `${lowerize(inputs.name)}Service.types.ts`,
                        content: inputs => `export interface I${capitalize(inputs.name)}Service { }`
                    },
                    {
                        type: 'file',
                        name: inputs => `index.ts`,
                        content: inputs => `export * from "./${lowerize(inputs.name)}Service";
export * from "./${lowerize(inputs.name)}Service.types";`
                    }
                ]
            }
        ]
    }
}
