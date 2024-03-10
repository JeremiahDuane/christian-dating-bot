import { Events } from 'discord.js';

export class EventMessage {
    event: Events;
    focus: String;
    value: any;
    toString: () => string;
    constructor(event?: Events, focus?: any, value?: any) {
        this.event = event;
        this.focus = focus;
        this.value = value;        
        this.toString = () => {
            let result = ''
            if (this.event) result = "\nEvent: { " + this.event + " }"
            if (!this.focus) result = "\nFocus: { " + this.focus + " }"
            if (!this.value) result = "\nValue: { " + this.value + " }"
            return result
        }
    }
}