import {program} from 'commander';



program
.name(`name`)
.option(`-n --name [name]`, `name of the project`)
.parse(program.argv)