import _ from 'lodash';
import Task from './taskwarrior/task';
import { extract_uuids } from './utils';
import TaskCommand from './TaskCommand';


module.exports = class TaskDelete extends TaskCommand {

    async taskDelete(args,[start,end]) {
        let buffer = await this.nvim.buffer;
        let lines  = await buffer.getLines({ start: start - 1, end }); 

        buffer.remove( start - 1, end ); 

        let tasks = extract_uuids(lines).map( uuid => this.tw.task({ uuid }) );

        tasks.forEach( t => t.done() );
    }
}


