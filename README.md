
# Open door

PWA for open door with you mobile with Homey

Buildt with Svelte 3

## Installing / configuring

(Set up Homey as described in my blogpost)[https://medium.com/@itrond/unlock-your-door-with-you-phone-eadda0d9e068]

Adjust ```.example.env``` accordingly to you Homey setup. Rename it to ```.env```

Your variables will be substitued in source code in the build process.


## Run on dev machine 

Install the dependencies...

```bash
npm install
```



...

```bash
npm run dev
```

Navigate to [localhost:5000](http://localhost:5000). You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.


## Deploying to the web

### With [now](https://zeit.co/now)

Install `now` if you haven't already:

```bash
npm install -g now
```

Then, from within your project folder:

```bash
now
```

