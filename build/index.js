"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const db_1 = require("./lib/db");
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        const PORT = Number(process.env.PORT) || 8000;
        app.use(express_1.default.json());
        //create graphql server
        const gqlserver = new server_1.ApolloServer({
            typeDefs: `
    type Query {
     hello : String
     bye : String
     say(name : String) : String
    }

    type Mutation {
       createuser(fristName: String! , lastName: String! , email:String!, password:String!) :Boolean
    }
    `, // schema as string
            resolvers: {
                Query: {
                    hello: () => `hey there , I am a grapgql server `,
                    bye: () => `Bye , from apollo server `,
                    say: (parent, { name }) => `hey i am ${name}`,
                },
                Mutation: {
                    createuser: (parent_1, _a) => __awaiter(this, [parent_1, _a], void 0, function* (parent, { fristName, lastName, email, password }) {
                        yield db_1.prismaclient.user.create({
                            data: {
                                email,
                                fristName,
                                lastName,
                                password,
                                salt: "random_salt",
                            },
                        });
                        return true;
                    }),
                },
            }
        });
        yield gqlserver.start();
        // app.use(expressMiddleware(gqlserver)); //set graphql server apn all sathi
        app.use("/graphql", (0, express4_1.expressMiddleware)(gqlserver)); //set graphql server apn all sathi
        app.get("/", (req, res) => {
            return res.json({
                massage: "server is up  and running...🚀"
            });
        });
        // app.get("/graphql" , (req, res) =>{
        //     return res.gqlserver
        // })
        app.listen(PORT, () => { console.log(`server is running at PORT ${PORT} 🚀`); });
    });
}
init(); //call global level
