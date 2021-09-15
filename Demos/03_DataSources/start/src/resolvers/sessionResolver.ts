import { ISession } from "../models";

export default {
    Query: {
        sessions: (parent, args, context, info): ISession[] => {
          return [
            {
              id: 1,
              title: 'First Session',
              abstract: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam'
            },
          ];
        },
        session: (parent, args, context, info): ISession => {
          return {
            id: args.sessionId,
            title: 'First Session',
            abstract: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam'
          };
        },
      },
}