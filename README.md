"P2P Internet Client Version 1.0"
=================================
This software is designed to serve as a platform for Peer-to-Peer communication.
Users of this software create their own 'services' that can communicate with other
Users' services.

+ An **Initialization Service** starts the user's services.
+ One such service that is started by the Initialization Service is the **Core Service** which does the following:
  * It provides an interface to easily manage sessions.
  * It provides an interface to a customizable **Database** (By default it's SQLite, but this will be customizable eventually)
  * It provides an interface to configure the NodeJSProject.
+ Another service that is started by the Initialization Service is the **GUI Service** which does the following:
  * thing 1
  * thing 2

To install this program on your own computer just follow these
3 simple steps.
```
1. Clone the github repo (or obtain this software some other way)
2. Open Terminal.
3. Run the install.sh file located in the same folder as this readme.
```
Read the documentation in the "docs" folder for more information.
