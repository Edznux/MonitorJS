# MonitorJS

MonitorJS is a modular, NodeJS based monitoring tool.

This repository is the core of the tool.
It allow both HTTP (Rest api) and Websocket connection to client.

Each module can be found in the `/lib/addon` folder

## Features

### API

- [x] HTTP REST API-
	- [x] Memory
	- [x] CPU
	- [x] Networking
	- [x] Disk
- [ ] Websocket API
	- [x] Memory
	- [x] CPU
	- [x] Networking
	- [x] Disk
	- [ ] Alert

### Analytics

- [ ] User
	+ [ ] Browser
	+ [ ] Timing (loading time, DOM rendering, etc...)

### Misc

- [ ] Installer
- [ ] Full Windows support
- [ ] Notification (browser & email)

## Install

First, clone the repo
```
git clone https://github.com/Edznux/MonitorJS
```

Move into the directory
```
cd MonitorJS
```

Install node modules
```
npm install
```

Start the app:
```
node app.js
```

### Database *(Optional)*

#### Debian based distribution (ubuntu)
```
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv 7F0CEB10
echo "deb http://repo.mongodb.org/apt/debian wheezy/mongodb-org/3.0 main" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
```
[More documentation](https://docs.mongodb.org/v3.0/tutorial/install-mongodb-on-debian/ "More infos")

## Documentation

### Addons

#### Create

Any javascript files in the `/lib/addon` folder will be auto-loaded (at startup).

Requirement for each addons :

```js
module.exports = function(app){
// do something
}
```

#### Enable / Disable

Each addon is in it's own .js file. Disabling one addon is simple as :
```
cd lib/addon
mv addonName.js _addonName.js
```
(on Unix based systems)

Re-enable them by the reverse operation
```
cd lib/addon
mv _addonName.js addonName.js
```

### Developpement

#### Application wide variable

- Socket
	+ `app.sendDataWs(data, channel)` Method for sending data over websocket ()
	+ `app.io` Socket.io instance variable
- Monitoring object
	+ `app.monitor`
		* disk
			- `all` Array of Array : Gt all raw "data"
			- `fileSystem` Array : File-system type
			- `size` Array : Size for each partition (in bytes)
			- `used` Array : Capacity used (in bytes)
			- `avail` Array : Capacity available (in bytes)
			- `use` Array : Usage percentages
			- `mounted` Array : List of all mounted file system
		* cpu
			- `uptime` Number : Uptime in seconds
			- `load` Number : Load over 5 seconds
			- `stats` Array of Objects :
				```
				{
					model: String,
					speed: Number,
					times: {
						user: Number,
       						nice: Number,
						sys: Number,
       						idle: Number,
						irq: Number
					}
				}
				```
			- `infos` : Array (/proc/cpuinfo parsing)
		* memory
			- `all` Array : All the information about memory
			- `total` Number : total memory on the system (in bytes)
			- `free` Number : Free memory on the system (in bytes)
			- `cached` Number : cached memory on the system (in bytes)
			- `buffers` Number : buffered memory on the system (in bytes)
			- `active` Number : active memory on the system (in bytes)
			- `inactive` Number : inactive memory on the system (in bytes)
		* os
			- `release` String : Name of the release
			- `architecture` String : 'x64', 'arm', 'ia32'
			- `type` String : System name
		* network
			- `interfaces` Object : ```{ interfaceX : [{adress : String, netmask : String, familly : String, mac: String, internal : Boolean }] ```
			- `rx` Number : rx bytes since boot
			- `tx` Number : tx bytes since boot
			- `ping` Number : last ping against target (set in config)



## Contributions
Feel free to PR or link your modules, i will add them to this readme

## Dependencies

- Express
- Socket.io

## Licence

The MIT License (MIT)

Copyright (c) <2015> <Edznux>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
