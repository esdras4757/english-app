import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import dotenv from 'dotenv';
import { ConfigService } from '@nestjs/config';
import e from 'express';

const lastThreadId='thread_U1NPElSrJ6FXQSF3Ya2kOFE5'

@Injectable()
export class OpeniaService {
    private openai: OpenAI; 

    constructor(private configService: ConfigService) {
        const openai= new OpenAI({ apiKey: this.configService.get<string>('OPENAI_API_KEY') });
        this.openai = openai;
        // this.getAssistants();
        // this.createThread()
        // this.deleteThread(lastThreadId)
        // this.getThread("thread_len4UCQc9KZO3Xrz00MQbgvs")
        // this.createMessage("thread_len4UCQc9KZO3Xrz00MQbgvs", "Hola")
        // this.listRuns("thread_len4UCQc9KZO3Xrz00MQbgvs")
        // this.cancelRun("thread_len4UCQc9KZO3Xrz00MQbgvs", "run_e4U8peJkKJ5zl8sft7485YZb")
        // this.getRun( )
        // this.createAssistant()
    }


    async createAssistant() {

        const assistant = await this.openai.beta.assistants.create({
            name: "",
            instructions: "tengo una conversacion en ingles contigo, Corrige los errores gramaticales y de pronunciación en las respuestas del usuario, ofreciendo explicaciones y ejemplos correctos, y luego continúa la conversación de manera natural. responde en medida de lo posible siempre en ingles",
            model: "gpt-3.5-turbo",
        });
        console.log(assistant);
        return assistant;
    }

    async getAssistants() {
        const assistants = await this.openai.beta.assistants.list();
        console.log(assistants);
    }

    async getAssistant(id: string) {
        const assistant = await this.openai.beta.assistants.retrieve(id);
        console.log(assistant);
    }

    async deleteAssistant(id: string) {
        const assistant = await this.openai.beta.assistants.del(id);
        console.log(assistant);
    }

    async updateAssistant(id: string) {
        const assistant = await this.openai.beta.assistants.update(id, {
            name: "new name",
        });
        console.log(assistant);
    }

    async createThread() {
        const thread = await this.openai.beta.threads.create();
        console.log(thread);
    }

    async getThread(id: string) {
        const thread = await this.openai.beta.threads.retrieve(id);
        console.log(thread);
    }

    async createMessage(content: string) {
        try {
            // Verifica si el hilo ya tiene mensajes
            const existingMessages = await this.openai.beta.threads.messages.list(lastThreadId);
    
            // Si el hilo no tiene mensajes, agrega el Prompter Inicial
            if (existingMessages.data.length === 0) {
                await this.openai.beta.threads.messages.create(lastThreadId, {
                    role: "assistant",  // Usa "assistant" en lugar de "system"
                    content: "Let's have a conversation in English. I will correct any mistakes that contain mixed Spanish and English, grammar, spelling or pronunciation errors that you identify, briefly explain why it is wrong. Please respond in English or if you consider it necessary you can use Spanish.",
                });
            }
    
            // Crea el mensaje del usuario
            const message = await this.openai.beta.threads.messages.create(lastThreadId, {
                role: "user",
                content: content,
            });
            console.log(message, 'message');
    
            // Ejecuta la acción correspondiente
            const responseRun = await this.createRun(lastThreadId, 'asst_F2cN2FLPEHkw1IqNpOGVqQdX');
            return responseRun;
        } catch (error) {
            console.log({error, message: 'Error message'});
        }
    }
    
    

    async createRun(thread_id: string, assistant_id: string) {
        try {
            const response = await this.openai.beta.threads.runs.create(thread_id, {assistant_id});
            console.log(response,'response run');
            const retrievedRun = await this.retriveRun(response.thread_id, response.id);
            return retrievedRun;
        } catch (error) {
            console.log({error, message: 'Error creating run'});
        }
    }

    async getFinalMessage(thread_id: string) {
        const thread = await this.openai.beta.threads.messages.list(thread_id);
        const data= thread.data[0].content[0];
        console.log(data.type === 'text' && data.text , 'thread');
    }

    async retriveRun(thread_id: string, run_id: string) {
        console.log(thread_id,'thread_id', run_id, 'run_id');
        try {

            if (!thread_id || !run_id) {
                throw new Error('thread_id and run_id are required');
            }

            const run = await this.openai.beta.threads.runs.retrieve(thread_id, run_id);
            console.log(run, 'response retrive run');
           

            if (run && run.status == 'completed') {
                console.log(run,'run');
                this.getFinalMessage(thread_id);
                return run;
            }

            this.retriveRun(thread_id, run_id);

        } catch (error) {
            console.log({error, message: 'Error retrieving run'});
        }
    }



    async listRuns(thread_id: string) {
        const runs = await this.openai.beta.threads.runs.list(thread_id);
        console.log(runs);
    }

    async getRun() {
        const run = await this.openai.beta.threads.runs.retrieve(lastThreadId, 'run_XK5y8Cx15N4L3hRcvqfXrgJA');
        console.log(run);
    }

    async cancelRun(thread_id: string, run_id: string) {
        const run = await this.openai.beta.threads.runs.cancel(thread_id, run_id);
        console.log(run);
    }

    async deleteThread(thread_id: string) {
        const thread = await this.openai.beta.threads.del(thread_id);
        console.log(thread);
    }


}


// thread_len4UCQc9KZO3Xrz00MQbgvs
