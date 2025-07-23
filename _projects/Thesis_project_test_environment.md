---
layout: page
title: Test environment
description: Thesis project - test environemt for testing devices with GazModem protocol
img: assets/img/thesisProject/test.png
importance: 1
category: work
related_publications: false
---

# Project Description

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/thesisProject/program.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/thesisProject/defs1.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/thesisProject/drzewo.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Here is an interface of the environment. It was improved a lot later as the environment now is a property of Plum Sp. z o.o. and is developed by them.
</div>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/thesisProject/test.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Example test written in custom language. It is very readable and pleasant in my opinion. 
</div>

This project is a desktop application developed as part of an engineering thesis. It is designed for communication with and testing of devices using the GAZ-MODEM protocol. The application allows sending and receiving data via a serial port, managing test tasks, and interpreting test scripts. It was implemented in C# using WPF for the graphical user interface.

# Features

* GAZ-MODEM frame handling (generation and decoding)
* Task management system including cyclic and panel tasks
* Test script interpreter with lexer, parser, and AST support
* Basic logging system and transmission statistics
* Communication with external device via serial port

# Project Structure
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/thesisProject/structure.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Here is a structure of the environment.  
</div>

The environment structure has a lot of small modules with single responsibility. Some of them has jobs specific for the company's protocol. 

### Interpreter system (System interpretera)

This whole block's responsibility is only parsing the test files. It deconstructs the files into simple operations. 
The output of the module is a series of tasks, some of them are meant to be executed repatedly (See CMM).

### Task system (System zadań)

The task system is a block which responsibility is to manage tasks from interpreter and possibly other tasks required by devices to simulate regular work (for example, setting time and date, protocol control, master/slave communication).
The task system is composed of following modules:
* STC - Simulation Task Controler (Kontroler zadań symulacyjnych) - manages tasks from the interpreter. Determines if task has to be executed periodically or not. 
* CMM - Constant Modification Module (Moduł modyfikacji ciągłej) - manages tasks that has to be executed periodically (for example, modification of parameter every 10 seconds)
* STM - Simulation Task Manager (Moduł zadań symulacyjnych) - manages every task in the system. Converts tasks into packets. Some tasks can be executed by sending one frame through serial port. This module collects such tasks into packets.
* PM - Packet Manager (Menedżer pakietów) - its responsibility is to execute packets and take care of the possible feedback (task - ask for a parameter, feedback - value of the parameter). It uses the interface of frame system.
* PTM - Panel Tasks Module (Moduł zadań panelowych) - sometime, the device, to work properly, has to get some communication that is not determined by test(for example, setting time and date, protocol control, master/slave communication). This module's responsibility is exactly that. Managing device or protocol specific communication. 

### Frame system (System ramek)

The frame system is an interface between task system and serial port of the computer. Its responsibility is to translate bits from port into protocol frames and in the other way.
It's composed of following modules:
* FG - Frame generator (Generator ramek) - Translates packets from PM into proper frames ready to send through serial port.
* FC - Frame catcher (Wykrywacz ramek) - Searches and translates frames from serial port and forms response packet for packet manager.

### Summary

My idea with such a structure was to create a lot of small modules that can be replaced according to requirements. For example, if we want to change the protocol, we need to provide new frame system only. We don't need to rewrite the whole system. Maybe the device specific communication has to be changed. Then we need to modify PTM only. This approach enables the flexibility of the implementation. 

# Technologies

* Programming language: C#
* IDE: Visual Studio 2017
* GUI: WPF (Windows Presentation Foundation)

# Possible Improvements

* Enable remote test execution over a network
* Command-line interface for test automation
* Code refactoring and implementation of unit tests
* Enhanced visualization of test flow and errors
* Implement other protocols such as MODBUS, etc.
* Implement other hardware communication ways such as I2C, SPI, etc.

# Source Code Availability

The source code cannot be publicly shared, as the project was developed for a company and is its property.

## Author

Marcin Górecki, 2025

