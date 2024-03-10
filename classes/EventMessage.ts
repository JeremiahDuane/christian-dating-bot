import { Events } from 'discord.js';

export class EventMessage extends String {
    constructor(event?: Events, focus?: any, value?: any) {
        super()
        let result = ''

        if (event) result = "\nEvent: { " + event + " }"
        if (!focus) result = "\nFocus: { " + focus + " }"
        if (!value) result = "\nValue: { " + value + " }"

        return result
    }
}