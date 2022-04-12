export class DefaultImage {
    defaultmessage: string = 'SampleCredential1234';
    generateSalt () {
      const hex = '0123456789abcdef';
      let output = '';
      for (let i = 0; i < 11; ++i) {
          output += hex.charAt(Math.floor(Math.random() * hex.length));
      }
      return output;
    }
  }