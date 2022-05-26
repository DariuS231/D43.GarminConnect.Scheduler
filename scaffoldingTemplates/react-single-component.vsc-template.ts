import * as vsc from 'vsc-base';
import {lowerize, capitalize} from "./common"

export function Template(path: string, templatePath: string): vsc.vscTemplate {
   return {
      userInputs: [
        {
            title: 'What is the Component Name',
            argumentName: 'name',
            defaultValue: 'test'
        }
      ],
      template: [
        {
            type: 'file',
            name: inputs => `${lowerize(inputs.name)}.tsx`,
            content: inputs => `import * as React from "react";

export interface I${capitalize(inputs.name)}Props { }

export const ${capitalize(inputs.name)} = (props: I${capitalize(inputs.name)}Props): JSX.Element => {
  return (<div>
      Hello World ${inputs.name}!!!
  </div>);
};`
        }
      ]
   }
}