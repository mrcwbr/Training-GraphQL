const SpeakerResolvers = {
  Query: {
    helloWorld: async (_: any, args: any) => {
      return 'HELLO WORDL!';
    },
  },
};

export default SpeakerResolvers;
