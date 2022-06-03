## Wigxel FP Playground

### Getting Started
Ensure your run the code below to start the compiler. The compiler simply converts our ESNEXT code to es5 so it can be executed by NodeJS from the terminal. All compiled files will be stored in the `/dist/` folder in the root directory.
  

```bash
> yarn start:compiler
```

While testing or tinkering ensure updates are made to the code in the `src` directory and not in `/dist`. 
You can run the code below to get the updates as you make changes to the files in the `src` folder. 
```
> yarn watch \"clear && node ./dist/filename.js\" ./src
or 
> npm run watch \"clear && node ./dist/filename.js\" ./src
```
Observe that we are watching the equivalent file in the `/dist` folder. If you want to watch for another file e.g index.js the filename will be replaced with `index.js`. See example below:
```bash
> yarn watch \"clear && node ./dist/index.js\" ./src
or
> npm watch \"clear && node ./dist/index.js\" ./src
```