const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSpPGVhnR14FZyiMvfiQLuAco2rnIU9FKPiM1V29aL7Lpd5NuYtmiG9d0tVOo96pjjzVVeSm1jvHM_A/pub?output=csv";
const vocabulary = [

    // =========================
    // 24.07.2026
    // =========================

    {
        date: "24.07.2026",
        topic: "CAN & Communication",
        german: "die Baudrate",
        english: "Baud rate",
        plural: "Baudraten",
        example: "Die Baudrate der UART-Schnittstelle beträgt 115200 Baud."
    },

    {
        date: "24.07.2026",
        topic: "CAN & Communication",
        german: "der Datenrahmen",
        english: "Data frame",
        plural: "Datenrahmen",
        example: "Der CAN-Bus sendet einen Datenrahmen."
    },

    {
        date: "24.07.2026",
        topic: "CAN & Communication",
        german: "der Master",b
        plural: "Master",
        example: "Der Master steuert die Kommunikation."
    },

    {
        date: "24.07.2026",
        topic: "CAN & Communication",
        german: "der Slave",
        english: "Slave",
        plural: "Slaves",
        example: "Der Slave antwortet auf die Anfrage des Masters."
    },

    {
        date: "24.07.2026",
        topic: "CAN & Communication",
        german: "die Prüfsumme",
        english: "Checksum",
        plural: "Prüfsummen",
        example: "Die Prüfsumme überprüft die Datenintegrität."
    },


    // =========================
    // 25.07.2026
    // =========================

    {
        date: "25.07.2026",
        topic: "CAN & Communication",
        german: "die Datenintegrität",
        english: "Data integrity",
        plural: "Datenintegritäten",
        example: "Die Prüfsumme gewährleistet die Datenintegrität."
    },

    {
        date: "25.07.2026",
        topic: "CAN & Communication",
        german: "die Übertragungsrate",
        english: "Transmission rate",
        plural: "Übertragungsraten",
        example: "Die Übertragungsrate des CAN-Busses ist hoch."
    },

    {
        date: "25.07.2026",
        topic: "CAN & Communication",
        german: "der Übertragungsfehler",
        english: "Transmission error",
        plural: "Übertragungsfehler",
        example: "Ein Übertragungsfehler kann die Kommunikation stören."
    },

    {
        date: "25.07.2026",
        topic: "CAN & Communication",
        german: "der Empfänger",
        english: "Receiver",
        plural: "Empfänger",
        example: "Der Empfänger verarbeitet die eingehenden Daten."
    },

    {
        date: "25.07.2026",
        topic: "CAN & Communication",
        german: "der Sender",
        english: "Sender",
        plural: "Sender",
        example: "Der Sender überträgt die Daten an den Empfänger."
    },


    // =========================
    // 26.07.2026
    // =========================

    {
        date: "26.07.2026",
        topic: "CAN & Diagnostics",
        german: "die CAN-Nachricht",
        english: "CAN message",
        plural: "CAN-Nachrichten",
        example: "Das Steuergerät sendet eine CAN-Nachricht."
    },

    {
        date: "26.07.2026",
        topic: "CAN & Diagnostics",
        german: "die Kennung",
        english: "Identifier",
        plural: "Kennungen",
        example: "Jede CAN-Nachricht hat eine eindeutige Kennung."
    },

    {
        date: "26.07.2026",
        topic: "CAN & Diagnostics",
        german: "die Nutzdaten",
        english: "Payload",
        plural: "Nutzdaten",
        example: "Die Nutzdaten enthalten die Sensorinformationen."
    },

    {
        date: "26.07.2026",
        topic: "CAN & Diagnostics",
        german: "die Diagnoseanfrage",
        english: "Diagnostic request",
        plural: "Diagnoseanfragen",
        example: "Das Diagnosegerät sendet eine Diagnoseanfrage."
    },

    {
        date: "26.07.2026",
        topic: "CAN & Diagnostics",
        german: "die Diagnoseantwort",
        english: "Diagnostic answer",
        plural: "Diagnoseantworten",
        example: "Das Steuergerät sendet eine Diagnoseantwort."
    },


    // =========================
    // 27.07.2026
    // =========================

    {
        date: "27.07.2026",
        topic: "Diagnostics",
        german: "der Fehlerspeicher",
        english: "Fault memory",
        plural: "Fehlerspeicher",
        example: "Das Steuergerät speichert Fehler im Fehlerspeicher."
    },

    {
        date: "27.07.2026",
        topic: "Diagnostics",
        german: "der Diagnosecode",
        english: "Diagnostic code",
        plural: "Diagnosecodes",
        example: "Das Diagnosegerät liest den Diagnosecode aus."
    },

    {
        date: "27.07.2026",
        topic: "Diagnostics",
        german: "löschen",
        english: "to delete",
        plural: "-",
        example: "Der Techniker löscht den Fehlerspeicher."
    },

    {
        date: "27.07.2026",
        topic: "Diagnostics",
        german: "auslesen",
        english: "to read out",
        plural: "-",
        example: "Das Diagnosegerät liest den Fehlerspeicher aus."
    },

    {
        date: "27.07.2026",
        topic: "Diagnostics",
        german: "der Diagnosemodus",
        english: "Diagnostic mode",
        plural: "Diagnosemodi",
        example: "Das Steuergerät befindet sich im Diagnosemodus."
    },


    // =========================
    // 28.07.2026
    // =========================

    {
        date: "28.07.2026",
        topic: "Diagnostics",
        german: "der Diagnosestecker",
        english: "Diagnostic connector",
        plural: "Diagnosestecker",
        example: "Das Diagnosegerät wird an den Diagnosestecker angeschlossen."
    },

    {
        date: "28.07.2026",
        topic: "Diagnostics",
        german: "die Diagnosefunktion",
        english: "Diagnostic function",
        plural: "Diagnosefunktionen",
        example: "Das Steuergerät unterstützt mehrere Diagnosefunktionen."
    },

    {
        date: "28.07.2026",
        topic: "Diagnostics",
        german: "der Systemfehler",
        english: "System error",
        plural: "Systemfehler",
        example: "Ein Systemfehler wurde erkannt."
    },

    {
        date: "28.07.2026",
        topic: "Diagnostics",
        german: "die Statusmeldung",
        english: "Status message",
        plural: "Statusmeldungen",
        example: "Das Steuergerät sendet eine Statusmeldung."
    },

    {
        date: "28.07.2026",
        topic: "Diagnostics",
        german: "die Initialisierungsphase",
        english: "Initialization phase",
        plural: "Initialisierungsphasen",
        example: "Während der Initialisierungsphase werden alle Sensoren geprüft."
    },


    // =========================
    // 29.07.2026
    // =========================

    {
        date: "29.07.2026",
        topic: "Diagnostics & Control Software",
        german: "die Diagnosekommunikation",
        english: "Diagnostic communication",
        plural: "Diagnosekommunikationen",
        example: "Die Diagnosekommunikation erfolgt über den CAN-Bus."
    },

    {
        date: "29.07.2026",
        topic: "Diagnostics & Control Software",
        german: "der Diagnosebefehl",
        english: "Diagnostic command",
        plural: "Diagnosebefehle",
        example: "Das Diagnosegerät sendet einen Diagnosebefehl."
    },

    {
        date: "29.07.2026",
        topic: "Diagnostics & Control Software",
        german: "die Antwortzeit",
        english: "Response time",
        plural: "Antwortzeiten",
        example: "Die Antwortzeit des Steuergeräts ist sehr kurz."
    },

    {
        date: "29.07.2026",
        topic: "Diagnostics & Control Software",
        german: "die Zeitüberschreitung",
        english: "Timeout",
        plural: "Zeitüberschreitungen",
        example: "Wegen einer Zeitüberschreitung wurde die Verbindung beendet."
    },

    {
        date: "29.07.2026",
        topic: "Diagnostics & Control Software",
        german: "die Steuerungssoftware",
        english: "Control software",
        plural: "Steuerungssoftwares",
        example: "Die Steuerungssoftware verarbeitet die Sensordaten."
    },


    // =========================
    // 30.07.2026
    // =========================

    {
        date: "30.07.2026",
        topic: "Software Architecture",
        german: "das Softwaremodul",
        english: "Software module",
        plural: "Softwaremodule",
        example: "Das Softwaremodul verarbeitet die Sensordaten."
    },

    {
        date: "30.07.2026",
        topic: "Software Architecture",
        german: "die Funktion",
        english: "Function",
        plural: "Funktionen",
        example: "Diese Funktion berechnet die Geschwindigkeit."
    },

    {
        date: "30.07.2026",
        topic: "Software Architecture",
        german: "die Programmlogik",
        english: "Program logic",
        plural: "Programmlogiken",
        example: "Die Programmlogik steuert den Ablauf."
    },

    {
        date: "30.07.2026",
        topic: "Software Architecture",
        german: "die Schnittstellenbeschreibung",
        english: "Interface description",
        plural: "Schnittstellenbeschreibungen",
        example: "Die Schnittstellenbeschreibung erklärt den Datenaustausch."
    },

    {
        date: "30.07.2026",
        topic: "Software Architecture",
        german: "die Softwarearchitektur",
        english: "Software architecture",
        plural: "Softwarearchitekturen",
        example: "Eine gute Softwarearchitektur erleichtert die Entwicklung."
    },


    // =========================
    // 31.07.2026
    // =========================

    {
        date: "31.07.2026",
        topic: "Software Development",
        german: "die Softwarekomponente",
        english: "Software component",
        plural: "Softwarekomponenten",
        example: "Die Softwarekomponente verarbeitet die Eingangsdaten."
    },

    {
        date: "31.07.2026",
        topic: "Software Development",
        german: "die Konfiguration",
        english: "Configuration",
        plural: "Konfigurationen",
        example: "Die Konfiguration wird im Steuergerät gespeichert."
    },

    {
        date: "31.07.2026",
        topic: "Software Development",
        german: "die Implementierung",
        english: "Implementation",
        plural: "Implementierungen",
        example: "Die Implementierung der Funktion ist abgeschlossen."
    },

    {
        date: "31.07.2026",
        topic: "Software Development",
        german: "die Anforderung",
        english: "Requirement",
        plural: "Anforderungen",
        example: "Die Software erfüllt alle Anforderungen."
    },

    {
        date: "31.07.2026",
        topic: "Software Development",
        german: "die Validierung",
        english: "Validation",
        plural: "Validierungen",
        example: "Die Validierung erfolgt vor der Freigabe."
    },


    // =========================
    // 01.08.2026
    // =========================

    {
        date: "01.08.2026",
        topic: "Testing & Documentation",
        german: "die Spezifikation",
        english: "Specification",
        plural: "Spezifikationen",
        example: "Die Spezifikation beschreibt die Anforderungen."
    },

    {
        date: "01.08.2026",
        topic: "Testing & Documentation",
        german: "die Dokumentation",
        english: "Documentation",
        plural: "Dokumentationen",
        example: "Eine gute Dokumentation ist sehr wichtig."
    },

    {
        date: "01.08.2026",
        topic: "Testing & Documentation",
        german: "der Testfall",
        english: "Test case",
        plural: "Testfälle",
        example: "Der Testfall wurde erfolgreich ausgeführt."
    },

    {
        date: "01.08.2026",
        topic: "Testing & Documentation",
        german: "die Testumgebung",
        english: "Test environment",
        plural: "Testumgebungen",
        example: "Die Software wird in der Testumgebung geprüft."
    },

    {
        date: "01.08.2026",
        topic: "Testing & Documentation",
        german: "die Freigabe",
        english: "Release",
        plural: "Freigaben",
        example: "Nach der Validierung erfolgt die Freigabe."
    },


    // =========================
    // 02.08.2026
    // =========================

    {
        date: "02.08.2026",
        topic: "Software Quality",
        german: "die Softwarequalität",
        english: "Software quality",
        plural: "Softwarequalitäten",
        example: "Eine hohe Softwarequalität ist sehr wichtig."
    },

    {
        date: "02.08.2026",
        topic: "Software Quality",
        german: "die Wartung",
        english: "Maintenance",
        plural: "Wartungen",
        example: "Die Wartung der Software erfolgt regelmäßig."
    },

    {
        date: "02.08.2026",
        topic: "Software Quality",
        german: "der Softwarefehler",
        english: "Software bug / error",
        plural: "Softwarefehler",
        example: "Der Softwarefehler wurde schnell behoben."
    },

    {
        date: "02.08.2026",
        topic: "Software Quality",
        german: "beheben",
        english: "to fix / to resolve",
        plural: "-",
        example: "Der Entwickler behebt den Softwarefehler."
    },

    {
        date: "02.08.2026",
        topic: "Software Quality",
        german: "die Fehlermeldung",
        english: "Error message",
        plural: "Fehlermeldungen",
        example: "Die Fehlermeldung wird auf dem Bildschirm angezeigt."
    },


    // =========================
    // 03.08.2026
    // =========================

    {
        date: "03.08.2026",
        topic: "Software Versions & Updates",
        german: "die Softwareversion",
        english: "Software version",
        plural: "Softwareversionen",
        example: "Das Steuergerät verwendet die neueste Softwareversion."
    },

    {
        date: "03.08.2026",
        topic: "Software Versions & Updates",
        german: "das Softwareupdate",
        english: "Software update",
        plural: "Softwareupdates",
        example: "Das Softwareupdate behebt mehrere Fehler."
    },

    {
        date: "03.08.2026",
        topic: "Software Versions & Updates",
        german: "die Kompatibilität",
        english: "Compatibility",
        plural: "Kompatibilitäten",
        example: "Die Kompatibilität mit der Hardware ist wichtig."
    },

    {
        date: "03.08.2026",
        topic: "Software Versions & Updates",
        german: "die Version",
        english: "Version",
        plural: "Versionen",
        example: "Wir verwenden die aktuelle Version der Software."
    },

    {
        date: "03.08.2026",
        topic: "Software Versions & Updates",
        german: "aktualisieren",
        english: "to update",
        plural: "-",
        example: "Der Entwickler aktualisiert die Software regelmäßig."
    },


    // =========================
    // 04.08.2026
    // =========================

    {
        date: "04.08.2026",
        topic: "Software Testing",
        german: "die Softwareprüfung",
        english: "Software testing",
        plural: "Softwareprüfungen",
        example: "Die Softwareprüfung wurde erfolgreich abgeschlossen."
    },

    {
        date: "04.08.2026",
        topic: "Software Testing",
        german: "die Fehlerbehebung",
        english: "Error fixing",
        plural: "Fehlerbehebungen",
        example: "Die Fehlerbehebung dauert zwei Tage."
    },

    {
        date: "04.08.2026",
        topic: "Software Testing",
        german: "die Systemintegration",
        english: "System integration",
        plural: "Systemintegrationen",
        example: "Die Systemintegration beginnt nächste Woche."
    },

    {
        date: "04.08.2026",
        topic: "Software Testing",
        german: "die Softwareentwicklung",
        english: "Software development",
        plural: "Softwareentwicklungen",
        example: "Ich arbeite in der Softwareentwicklung."
    },

    {
        date: "04.08.2026",
        topic: "Software Testing",
        german: "die Versionskontrolle",
        english: "Version control",
        plural: "Versionskontrollen",
        example: "Git wird für die Versionskontrolle verwendet."
    },


    // =========================
    // 05.08.2026
    // =========================

    {
        date: "05.08.2026",
        topic: "Source Code & Build",
        german: "die Versionsnummer",
        english: "Version number",
        plural: "Versionsnummern",
        example: "Die Versionsnummer ist 2.1.5."
    },

    {
        date: "05.08.2026",
        topic: "Source Code & Build",
        german: "die Quellcodedatei",
        english: "Source code file",
        plural: "Quellcodedateien",
        example: "Die Quellcodedatei enthält die Hauptfunktion."
    },

    {
        date: "05.08.2026",
        topic: "Source Code & Build",
        german: "die Konfigurationsdatei",
        english: "Configuration file",
        plural: "Konfigurationsdateien",
        example: "Die Konfigurationsdatei muss aktualisiert werden."
    },

    {
        date: "05.08.2026",
        topic: "Source Code & Build",
        german: "das Buildsystem",
        english: "Build system",
        plural: "Buildsysteme",
        example: "Das Buildsystem kompiliert das gesamte Projekt."
    },

    {
        date: "05.08.2026",
        topic: "Source Code & Build",
        german: "die Buildkonfiguration",
        english: "Build configuration",
        plural: "Buildkonfigurationen",
        example: "Die Build-Konfiguration wurde geändert."
    },


    // =========================
    // 06.08.2026
    // =========================

    {
        date: "06.08.2026",
        topic: "Git & Version Control",
        german: "das Repository",
        english: "Repository",
        plural: "Repositories",
        example: "Das Repository enthält den gesamten Quellcode."
    },

    {
        date: "06.08.2026",
        topic: "Git & Version Control",
        german: "der Commit",
        english: "Commit",
        plural: "Commits",
        example: "Ich habe einen neuen Commit erstellt."
    },

    {
        date: "06.08.2026",
        topic: "Git & Version Control",
        german: "der Branch",
        english: "Branch",
        plural: "Branches",
        example: "Wir entwickeln die neue Funktion in einem eigenen Branch."
    },

    {
        date: "06.08.2026",
        topic: "Git & Version Control",
        german: "das Merge",
        english: "Merge",
        plural: "Merges",
        example: "Das Merge war erfolgreich."
    },

    {
        date: "06.08.2026",
        topic: "Git & Version Control",
        german: "das Release",
        english: "Release",
        plural: "Releases",
        example: "Das neue Release wird morgen veröffentlicht."
    },


    // =========================
    // 07.08.2026
    // =========================

    {
        date: "07.08.2026",
        topic: "Error Analysis & Reliability",
        german: "die Fehlerursache",
        english: "Cause of error / Root cause",
        plural: "Fehlerursachen",
        example: "Wir müssen die Fehlerursache finden."
    },

    {
        date: "07.08.2026",
        topic: "Error Analysis & Reliability",
        german: "die Fehleranalyse",
        english: "Error analysis / Failure analysis",
        plural: "Fehleranalysen",
        example: "Die Fehleranalyse zeigt die Ursache des Problems."
    },

    {
        date: "07.08.2026",
        topic: "Error Analysis & Reliability",
        german: "die Leistungsaufnahme",
        english: "Power consumption",
        plural: "Leistungsaufnahmen",
        example: "Die Leistungsaufnahme des Steuergeräts ist zu hoch."
    },

    {
        date: "07.08.2026",
        topic: "Error Analysis & Reliability",
        german: "die Echtzeitfähigkeit",
        english: "Real-time capability",
        plural: "Echtzeitfähigkeiten",
        example: "Das System muss eine hohe Echtzeitfähigkeit haben."
    },

    {
        date: "07.08.2026",
        topic: "Error Analysis & Reliability",
        german: "die Zuverlässigkeit",
        english: "Reliability",
        plural: "Zuverlässigkeiten",
        example: "Die Zuverlässigkeit des Steuergeräts ist sehr wichtig."
    },


    // =========================
    // 08.08.2026
    // =========================

    {
        date: "08.08.2026",
        topic: "Embedded Systems Basics",
        german: "der Speicherverbrauch",
        english: "Memory usage / Memory consumption",
        plural: "Speicherverbräuche",
        example: "Der Speicherverbrauch des Programms ist zu hoch."
    },

    {
        date: "08.08.2026",
        topic: "Embedded Systems Basics",
        german: "die Ressource",
        english: "Resource",
        plural: "Ressourcen",
        example: "Das Programm benötigt viele Ressourcen."
    },

    {
        date: "08.08.2026",
        topic: "Embedded Systems Basics",
        german: "die Synchronisation",
        english: "Synchronization",
        plural: "Synchronisationen",
        example: "Die Synchronisation zwischen den Threads ist wichtig."
    },

    {
        date: "08.08.2026",
        topic: "Embedded Systems Basics",
        german: "der Zeigerfehler",
        english: "Pointer error",
        plural: "Zeigerfehler",
        example: "Ein Zeigerfehler kann zum Absturz des Programms führen."
    },

    {
        date: "08.08.2026",
        topic: "Embedded Systems Basics",
        german: "die Ausnahme",
        english: "Exception",
        plural: "Ausnahmen",
        example: "Das Programm behandelt die Ausnahme korrekt."
    },


    // =========================
    // 09.08.2026
    // =========================

    {
        date: "09.08.2026",
        topic: "Program Execution",
        german: "die Schnittstelle",
        english: "Interface",
        plural: "Schnittstellen",
        example: "Die Schnittstelle verbindet zwei Softwarekomponenten."
    },

    {
        date: "09.08.2026",
        topic: "Program Execution",
        german: "die Datenübertragung",
        english: "Data transmission",
        plural: "Datenübertragungen",
        example: "Die Datenübertragung erfolgt über den CAN-Bus."
    },

    {
        date: "09.08.2026",
        topic: "Program Execution",
        german: "die Verarbeitung",
        english: "Processing",
        plural: "Verarbeitungen",
        example: "Die Verarbeitung der Daten erfolgt in Echtzeit."
    },

    {
        date: "09.08.2026",
        topic: "Program Execution",
        german: "die Ausführung",
        english: "Execution",
        plural: "Ausführungen",
        example: "Die Ausführung des Programms dauert einige Sekunden."
    },

    {
        date: "09.08.2026",
        topic: "Program Execution",
        german: "die Überwachung",
        english: "Monitoring",
        plural: "Überwachungen",
        example: "Die Überwachung des Systems ist wichtig."
    },


    // =========================
    // 10.08.2026
    // =========================

    {
        date: "10.08.2026",
        topic: "Program Flow",
        german: "der Ablauf",
        english: "Process flow / sequence / procedure",
        plural: "Abläufe",
        example: "Der Ablauf des Programms wird dokumentiert."
    },

    {
        date: "10.08.2026",
        topic: "Program Flow",
        german: "der Programmablauf",
        english: "Program flow",
        plural: "Programmabläufe",
        example: "Der Programmablauf wird durch den Scheduler gesteuert."
    },

    {
        date: "10.08.2026",
        topic: "Program Flow",
        german: "die Zustandsänderung",
        english: "State change",
        plural: "Zustandsänderungen",
        example: "Eine Zustandsänderung löst eine Aktion aus."
    },

    {
        date: "10.08.2026",
        topic: "Program Flow",
        german: "das Ereignis",
        english: "Event",
        plural: "Ereignisse",
        example: "Ein Interrupt kann durch ein Ereignis ausgelöst werden."
    },

    {
        date: "10.08.2026",
        topic: "Program Flow",
        german: "die Bedingung",
        english: "Condition",
        plural: "Bedingungen",
        example: "Die Funktion wird ausgeführt, wenn eine bestimmte Bedingung erfüllt ist."
    },


    // =========================
    // 11.08.2026
    // =========================

    {
        date: "11.08.2026",
        topic: "State Machines",
        german: "der Zustand",
        english: "State",
        plural: "Zustände",
        example: "Das System befindet sich im normalen Zustand."
    },

    {
        date: "11.08.2026",
        topic: "State Machines",
        german: "der Betriebszustand",
        english: "Operating state",
        plural: "Betriebszustände",
        example: "Der Betriebszustand des Systems wird überwacht."
    },

    {
        date: "11.08.2026",
        topic: "State Machines",
        german: "der Zustandsautomat",
        english: "State machine",
        plural: "Zustandsautomaten",
        example: "Die Software verwendet einen Zustandsautomaten zur Steuerung des Systems."
    },

    {
        date: "11.08.2026",
        topic: "State Machines",
        german: "der Übergang",
        english: "Transition",
        plural: "Übergänge",
        example: "Ein Ereignis löst einen Übergang in einen anderen Zustand aus."
    },

    {
        date: "11.08.2026",
        topic: "State Machines",
        german: "die Schleifenbedingung",
        english: "Loop condition",
        plural: "Schleifenbedingungen",
        example: "Die Schleifenbedingung wird vor jeder Iteration geprüft."
    },


    // =========================
    // 12.08.2026
    // =========================

    {
        date: "12.08.2026",
        topic: "State Machines",
        german: "die Zustandsänderung",
        english: "State change",
        plural: "Zustandsänderungen",
        example: "Eine Zustandsänderung wird durch ein Ereignis ausgelöst."
    },

    {
        date: "12.08.2026",
        topic: "State Machines",
        german: "der Zustandseingang",
        english: "State entry",
        plural: "Zustandseingänge",
        example: "Beim Zustandseingang wird eine bestimmte Funktion ausgeführt."
    },

    {
        date: "12.08.2026",
        topic: "State Machines",
        german: "der Zustandsausgang",
        english: "State exit",
        plural: "Zustandsausgänge",
        example: "Beim Zustandsausgang werden bestimmte Variablen zurückgesetzt."
    },

    {
        date: "12.08.2026",
        topic: "State Machines",
        german: "die Schleifenbedingung",
        english: "Loop condition",
        plural: "Schleifenbedingungen",
        example: "Die Schleifenbedingung wird bei jeder Iteration geprüft."
    },

    {
        date: "12.08.2026",
        topic: "State Machines",
        german: "die Iteration",
        english: "Iteration",
        plural: "Iterationen",
        example: "Die Schleife wird in jeder Iteration ausgeführt."
    },


    // =========================
    // 13.08.2026
    // =========================

    {
        date: "13.08.2026",
        topic: "Testing",
        german: "der Testablauf",
        english: "Test procedure / Test process",
        plural: "Testabläufe",
        example: "Der Testablauf wird vor dem Test dokumentiert."
    },

    {
        date: "13.08.2026",
        topic: "Testing",
        german: "das Testergebnis",
        english: "Test result",
        plural: "Testergebnisse",
        example: "Das Testergebnis wird in der Dokumentation gespeichert."
    },

    {
        date: "13.08.2026",
        topic: "Testing",
        german: "der Testbericht",
        english: "Test report",
        plural: "Testberichte",
        example: "Der Entwickler erstellt einen Testbericht nach dem Test."
    },

    {
        date: "13.08.2026",
        topic: "Testing",
        german: "der Testfehler",
        english: "Test error",
        plural: "Testfehler",
        example: "Der Testfehler wird analysiert und behoben."
    },

    {
        date: "13.08.2026",
        topic: "Testing",
        german: "die Testabdeckung",
        english: "Test coverage",
        plural: "Testabdeckungen",
        example: "Eine hohe Testabdeckung verbessert die Softwarequalität."
    },

    {
        date: "13.08.2026",
        topic: "Testing",
        german: "der Testschritt",
        english: "Test step",
        plural: "Testschritte",
        example: "Der Testschritt wird dokumentiert."
    },

    {
        date: "13.08.2026",
        topic: "Testing",
        german: "die Testdurchführung",
        english: "Test execution",
        plural: "Testdurchführungen",
        example: "Die Testdurchführung erfolgt in der Testumgebung."
    },

    {
        date: "13.08.2026",
        topic: "Testing",
        german: "die Testbedingung",
        english: "Test condition",
        plural: "Testbedingungen",
        example: "Die Testbedingung muss vor dem Test definiert werden."
    },

    {
        date: "13.08.2026",
        topic: "Testing",
        german: "der Sollwert",
        english: "Target value / Setpoint",
        plural: "Sollwerte",
        example: "Der Sollwert wird mit dem Istwert verglichen."
    },

    {
        date: "13.08.2026",
        topic: "Testing",
        german: "der Istwert",
        english: "Actual value",
        plural: "Istwerte",
        example: "Der Istwert wird vom Sensor gemessen."
    },


    // =========================
    // 15.08.2026
    // =========================

    {
        date: "15.08.2026",
        topic: "Measurement & Control",
        german: "der Messwert",
        english: "Measured value",
        plural: "Messwerte",
        example: "Der Messwert wird vom Sensor erfasst."
    },

    {
        date: "15.08.2026",
        topic: "Measurement & Control",
        german: "die Abweichung",
        english: "Deviation / difference",
        plural: "Abweichungen",
        example: "Die Abweichung zwischen Sollwert und Istwert wird berechnet."
    },

    {
        date: "15.08.2026",
        topic: "Measurement & Control",
        german: "der Grenzwert",
        english: "Limit value / threshold",
        plural: "Grenzwerte",
        example: "Der Messwert darf den Grenzwert nicht überschreiten."
    },

    {
        date: "15.08.2026",
        topic: "Measurement & Control",
        german: "die Regelung",
        english: "Control / Regulation",
        plural: "Regelungen",
        example: "Die Regelung passt die Leistung automatisch an."
    },

    {
        date: "15.08.2026",
        topic: "Measurement & Control",
        german: "die Rückmeldung",
        english: "Feedback / response",
        plural: "Rückmeldungen",
        example: "Der Sensor liefert eine Rückmeldung an das Steuergerät."
    },


    // =========================
    // 16.08.2026
    // =========================

    {
        date: "16.08.2026",
        topic: "Sensors & Signals",
        german: "der Messbereich",
        english: "Measuring range",
        plural: "Messbereiche",
        example: "Der Sensor hat einen Messbereich von 0 bis 100 °C."
    },

    {
        date: "16.08.2026",
        topic: "Sensors & Signals",
        german: "die Genauigkeit",
        english: "Accuracy",
        plural: "Genauigkeiten",
        example: "Die Genauigkeit des Sensors ist für das System wichtig."
    },

    {
        date: "16.08.2026",
        topic: "Sensors & Signals",
        german: "die Auflösung",
        english: "Resolution",
        plural: "Auflösungen",
        example: "Der ADC hat eine Auflösung von 12 Bit."
    },

    {
        date: "16.08.2026",
        topic: "Sensors & Signals",
        german: "das Eingangssignal",
        english: "Input signal",
        plural: "Eingangssignale",
        example: "Das Eingangssignal wird vom Mikrocontroller verarbeitet."
    },

    {
        date: "16.08.2026",
        topic: "Sensors & Signals",
        german: "das Ausgangssignal",
        english: "Output signal",
        plural: "Ausgangssignale",
        example: "Das Steuergerät erzeugt ein Ausgangssignal."
    },


    // =========================
    // 17.08.2026
    // =========================

    {
        date: "17.08.2026",
        topic: "CAN Communication",
        german: "die Nachrichten-ID",
        english: "Message ID",
        plural: "Nachrichten-IDs",
        example: "Die Nachrichten-ID identifiziert die CAN-Nachricht."
    },

    {
        date: "17.08.2026",
        topic: "CAN Communication",
        german: "der Datenrahmen",
        english: "Data frame",
        plural: "Datenrahmen",
        example: "Der Datenrahmen enthält die Nutzdaten und die Kennung."
    },

    {
        date: "17.08.2026",
        topic: "CAN Communication",
        german: "die Übertragung",
        english: "Data transmission",
        plural: "Übertragungen",
        example: "Die Übertragung der CAN-Daten erfolgt schnell."
    },

    {
        date: "17.08.2026",
        topic: "CAN Communication",
        german: "die Übertragungsrate",
        english: "Transmission rate",
        plural: "Übertragungsraten",
        example: "Die Übertragungsrate des CAN-Busses wird konfiguriert."
    },

    {
        date: "17.08.2026",
        topic: "CAN Communication",
        german: "die Prüfsumme",
        english: "Checksum",
        plural: "Prüfsummen",
        example: "Die Prüfsumme wird zur Prüfung der Datenintegrität verwendet."
    },


    // =========================
    // 18.08.2026
    // =========================

    {
        date: "18.08.2026",
        topic: "CAN & Error Detection",
        german: "der Übertragungsfehler",
        english: "Transmission error",
        plural: "Übertragungsfehler",
        example: "Der Übertragungsfehler wird vom System erkannt."
    },

    {
        date: "18.08.2026",
        topic: "CAN & Error Detection",
        german: "die Datenintegrität",
        english: "Data integrity",
        plural: "-",
        example: "Die Prüfsumme dient zur Sicherstellung der Datenintegrität."
    },

    {
        date: "18.08.2026",
        topic: "CAN & Error Detection",
        german: "die Datenübertragung",
        english: "Data transmission",
        plural: "Datenübertragungen",
        example: "Die Datenübertragung über den CAN-Bus funktioniert zuverlässig."
    },

    {
        date: "18.08.2026",
        topic: "CAN & Error Detection",
        german: "die Zeitüberschreitung",
        english: "Timeout",
        plural: "Zeitüberschreitungen",
        example: "Bei einer Zeitüberschreitung wird eine Fehlermeldung erzeugt."
    },

    {
        date: "18.08.2026",
        topic: "CAN & Error Detection",
        german: "die Fehlererkennung",
        english: "Error detection",
        plural: "Fehlererkennungen",
        example: "Die Fehlererkennung ist für die Sicherheit des Systems wichtig."
    },


    // =========================
    // 19.08.2026
    // =========================

    {
        date: "19.08.2026",
        topic: "Memory Management",
        german: "der Speicher",
        english: "Memory",
        plural: "Speicher",
        example: "Der Mikrocontroller verfügt über einen begrenzten Speicher."
    },

    {
        date: "19.08.2026",
        topic: "Memory Management",
        german: "der Speicherzugriff",
        english: "Memory access",
        plural: "Speicherzugriffe",
        example: "Der Speicherzugriff muss effizient sein."
    },

    {
        date: "19.08.2026",
        topic: "Memory Management",
        german: "der Speicherverbrauch",
        english: "Memory usage",
        plural: "Speicherverbräuche",
        example: "Der Speicherverbrauch der Software ist zu hoch."
    },

    {
        date: "19.08.2026",
        topic: "Memory Management",
        german: "der Speicherbereich",
        english: "Memory area",
        plural: "Speicherbereiche",
        example: "Die Variable wird in einem bestimmten Speicherbereich gespeichert."
    },

    {
        date: "19.08.2026",
        topic: "Memory Management",
        german: "das Speicherleck",
        english: "Memory leak",
        plural: "Speicherlecks",
        example: "Ein Speicherleck kann dazu führen, dass der verfügbare Speicher immer kleiner wird."
    },


    // =========================
    // 20.08.2026
    // =========================

    {
        date: "20.08.2026",
        topic: "Memory Management — Stack, Heap & Pointers",
        german: "der Stack",
        english: "Stack",
        plural: "Stacks",
        example: "Lokale Variablen werden normalerweise auf dem Stack gespeichert."
    },

    {
        date: "20.08.2026",
        topic: "Memory Management — Stack, Heap & Pointers",
        german: "der Heap",
        english: "Heap",
        plural: "Heaps",
        example: "Dynamischer Speicher wird auf dem Heap reserviert."
    },

    {
        date: "20.08.2026",
        topic: "Memory Management — Stack, Heap & Pointers",
        german: "der Zeiger",
        english: "Pointer",
        plural: "Zeiger",
        example: "Ein Zeiger enthält die Adresse einer Variablen."
    },

    {
        date: "20.08.2026",
        topic: "Memory Management — Stack, Heap & Pointers",
        german: "die Adresse",
        english: "Address",
        plural: "Adressen",
        example: "Der Zeiger enthält die Speicheradresse der Variablen."
    },

    {
        date: "20.08.2026",
        topic: "Memory Management — Stack, Heap & Pointers",
        german: "die Speicherzuweisung",
        english: "Memory allocation",
        plural: "Speicherzuweisungen",
        example: "Die Speicherzuweisung erfolgt während der Programmausführung."
    },


    // =========================
    // 21.08.2026
    // =========================

    {
        date: "21.08.2026",
        topic: "Memory Management — Pointers & Errors",
        german: "die Speicheradresse",
        english: "Memory address",
        plural: "Speicheradressen",
        example: "Der Zeiger enthält die Speicheradresse einer Variablen."
    },

    {
        date: "21.08.2026",
        topic: "Memory Management — Pointers & Errors",
        german: "die Dereferenzierung",
        english: "Dereferencing",
        plural: "Dereferenzierungen",
        example: "Bei der Dereferenzierung greift das Programm auf den Wert zu, auf den der Zeiger zeigt."
    },

    {
        date: "21.08.2026",
        topic: "Memory Management — Pointers & Errors",
        german: "der Zeigerfehler",
        english: "Pointer error",
        plural: "Zeigerfehler",
        example: "Ein Zeigerfehler kann zu einem Programmabsturz führen."
    },

    {
        date: "21.08.2026",
        topic: "Memory Management — Pointers & Errors",
        german: "der Nullzeiger",
        english: "Null pointer",
        plural: "Nullzeiger",
        example: "Ein Nullzeiger zeigt auf keine gültige Speicheradresse."
    },

    {
        date: "21.08.2026",
        topic: "Memory Management — Pointers & Errors",
        german: "der Speicherzugriffsfehler",
        english: "Memory access error",
        plural: "Speicherzugriffsfehler",
        example: "Ein Speicherzugriffsfehler kann auftreten, wenn auf eine ungültige Adresse zugegriffen wird."
    },


    // =========================
    // 22.08.2026
    // =========================

    {
        date: "22.08.2026",
        topic: "Memory Management — RAM & Flash",
        german: "der Arbeitsspeicher",
        english: "RAM / working memory",
        plural: "Arbeitsspeicher",
        example: "Der Arbeitsspeicher enthält Daten, die während der Programmausführung benötigt werden."
    },

    {
        date: "22.08.2026",
        topic: "Memory Management — RAM & Flash",
        german: "der Programmspeicher",
        english: "Program memory / Code memory",
        plural: "Programmspeicher",
        example: "Der Programmspeicher enthält den Programmcode."
    },

    {
        date: "22.08.2026",
        topic: "Memory Management — RAM & Flash",
        german: "der Flash-Speicher",
        english: "Flash memory",
        plural: "Flash-Speicher",
        example: "Der Flash-Speicher speichert die Firmware dauerhaft."
    },

    {
        date: "22.08.2026",
        topic: "Memory Management — RAM & Flash",
        german: "der flüchtige Speicher",
        english: "Volatile memory",
        plural: "flüchtige Speicher",
        example: "RAM ist ein flüchtiger Speicher."
    },

    {
        date: "22.08.2026",
        topic: "Memory Management — RAM & Flash",
        german: "der nichtflüchtige Speicher",
        english: "Non-volatile memory",
        plural: "nichtflüchtige Speicher",
        example: "Flash ist ein nichtflüchtiger Speicher."
    },


    // =========================
    // 23.08.2026
    // =========================

    {
        date: "23.08.2026",
        topic: "Embedded C — Memory Sections",
        german: "der Codebereich",
        english: "Code section / Code area",
        plural: "Codebereiche",
        example: "Der Codebereich enthält den ausführbaren Programmcode."
    },

    {
        date: "23.08.2026",
        topic: "Embedded C — Memory Sections",
        german: "der Datenbereich",
        english: "Data section / Data area",
        plural: "Datenbereiche",
        example: "Der Datenbereich enthält globale und statische Variablen."
    },

    {
        date: "23.08.2026",
        topic: "Embedded C — Memory Sections",
        german: "der BSS-Bereich",
        english: "BSS area",
        plural: "BSS-Bereiche",
        example: "Der BSS-Bereich enthält nicht initialisierte globale Variablen."
    },

    {
        date: "23.08.2026",
        topic: "Embedded C — Memory Sections",
        german: "die globale Variable",
        english: "Global variable",
        plural: "globale Variablen",
        example: "Eine globale Variable kann von mehreren Funktionen verwendet werden."
    },

    {
        date: "23.08.2026",
        topic: "Embedded C — Memory Sections",
        german: "die statische Variable",
        english: "Static variable",
        plural: "statische Variablen",
        example: "Eine statische Variable behält ihren Wert zwischen Funktionsaufrufen."
    },


    // =========================
    // 24.08.2026
    // =========================

    {
        date: "24.08.2026",
        topic: "Embedded C — Initialization & Constants",
        german: "der Initialwert",
        english: "Initial value",
        plural: "Initialwerte",
        example: "Der Initialwert der Variable ist null."
    },

    {
        date: "24.08.2026",
        topic: "Embedded C — Initialization & Constants",
        german: "die Initialisierungsliste",
        english: "Initialization list",
        plural: "Initialisierungslisten",
        example: "Die Initialisierungsliste wird verwendet, um Variablen mit Startwerten zu versehen."
    },

    {
        date: "24.08.2026",
        topic: "Embedded C — Initialization & Constants",
        german: "die Konstante",
        english: "Constant",
        plural: "Konstanten",
        example: "Eine Konstante kann während der Programmausführung nicht verändert werden."
    },

    {
        date: "24.08.2026",
        topic: "Embedded C — Initialization & Constants",
        german: "der Nur-Lese-Speicher",
        english: "Read-only memory",
        plural: "Nur-Lese-Speicher",
        example: "Der Nur-Lese-Speicher enthält Daten, die nicht verändert werden sollen."
    },

    {
        date: "24.08.2026",
        topic: "Embedded C — Initialization & Constants",
        german: "der Festwert",
        english: "Fixed value",
        plural: "Festwerte",
        example: "Der Festwert wird im Programmspeicher abgelegt."
    },


    // =========================
    // 25.08.2026
    // =========================

    {
        date: "25.08.2026",
        topic: "Compilation & Build",
        german: "die Quelldatei",
        english: "Source file",
        plural: "Quelldateien",
        example: "Die Quelldatei enthält den C-Code."
    },

    {
        date: "25.08.2026",
        topic: "Compilation & Build",
        german: "die Objektdatei",
        english: "Object file",
        plural: "Objektdateien",
        example: "Der Compiler erzeugt eine Objektdatei."
    },

    {
        date: "25.08.2026",
        topic: "Compilation & Build",
        german: "die ausführbare Datei",
        english: "Executable file",
        plural: "ausführbare Dateien",
        example: "Der Linker erzeugt eine ausführbare Datei."
    },

    {
        date: "25.08.2026",
        topic: "Compilation & Build",
        german: "der Linker",
        english: "Linker",
        plural: "Linker",
        example: "Der Linker verbindet die Objektdateien."
    },

    {
        date: "25.08.2026",
        topic: "Compilation & Build",
        german: "das Linkerskript",
        english: "Linker script",
        plural: "Linkerskripte",
        example: "Das Linkerskript legt die Speicherbereiche des Programms fest."
    },


    // =========================
    // 26.08.2026
    // =========================

    {
        date: "26.08.2026",
        topic: "Compilation, Linking & Firmware",
        german: "der Build",
        english: "Build",
        plural: "Builds",
        example: "Der Build wird nach jeder Änderung des Quellcodes durchgeführt."
    },

    {
        date: "26.08.2026",
        topic: "Compilation, Linking & Firmware",
        german: "der Buildprozess",
        english: "Build process",
        plural: "Buildprozesse",
        example: "Der Build-Prozess umfasst die Kompilierung und das Linken."
    },

    {
        date: "26.08.2026",
        topic: "Compilation, Linking & Firmware",
        german: "die Kompilierung",
        english: "Compilation",
        plural: "Kompilierungen",
        example: "Die Kompilierung des Quellcodes dauert nur wenige Sekunden."
    },

    {
        date: "26.08.2026",
        topic: "Compilation, Linking & Firmware",
        german: "das Linken",
        english: "Linking",
        plural: "-",
        example: "Beim Linken werden die Objektdateien miteinander verbunden."
    },

    {
        date: "26.08.2026",
        topic: "Compilation, Linking & Firmware",
        german: "die Firmware-Datei",
        english: "Firmware file",
        plural: "Firmware-Dateien",
        example: "Die Firmware-Datei wird anschließend auf den Mikrocontroller übertragen."
    },


    // =========================
    // 27.08.2026
    // =========================

    {
        date: "27.08.2026",
        topic: "Firmware Flashing & Debugging",
        german: "das Flashen",
        english: "Flashing",
        plural: "-",
        example: "Das Flashen der Firmware dauert einige Sekunden."
    },

    {
        date: "27.08.2026",
        topic: "Firmware Flashing & Debugging",
        german: "der Flashvorgang",
        english: "Flashing process",
        plural: "Flashvorgänge",
        example: "Der Flashvorgang wird über den Debugger gestartet."
    },

    {
        date: "27.08.2026",
        topic: "Firmware Flashing & Debugging",
        german: "die Fehlersuche",
        english: "Debugging / Troubleshooting",
        plural: "Fehlersuchen",
        example: "Die Fehlersuche hilft dem Entwickler, die Fehlerursache zu finden."
    },

    {
        date: "27.08.2026",
        topic: "Firmware Flashing & Debugging",
        german: "die Firmware-Aktualisierung",
        english: "Firmware update",
        plural: "Firmware-Aktualisierungen",
        example: "Die Firmware-Aktualisierung behebt mehrere Softwarefehler."
    },

    {
        date: "27.08.2026",
        topic: "Firmware Flashing & Debugging",
        german: "der Haltepunkt",
        english: "Breakpoint",
        plural: "Haltepunkte",
        example: "Der Entwickler setzt einen Haltepunkt im Quellcode."
    },


    // =========================
    // 28.08.2026
    // =========================

    {
        date: "28.08.2026",
        topic: "Debugging & Error Analysis",
        german: "der Fehler",
        english: "Error / fault",
        plural: "Fehler",
        example: "Der Entwickler untersucht den Fehler."
    },

    {
        date: "28.08.2026",
        topic: "Debugging & Error Analysis",
        german: "die Fehlerursache",
        english: "Cause of error",
        plural: "Fehlerursachen",
        example: "Der Entwickler sucht nach der Fehlerursache."
    },

    {
        date: "28.08.2026",
        topic: "Debugging & Error Analysis",
        german: "die Fehlermeldung",
        english: "Error message",
        plural: "Fehlermeldungen",
        example: "Die Fehlermeldung wird im System angezeigt."
    },

    {
        date: "28.08.2026",
        topic: "Debugging & Error Analysis",
        german: "das Protokoll",
        english: "Protocol / log",
        plural: "Protokolle",
        example: "Der Entwickler überprüft das Protokoll, um den Fehler zu finden."
    },

    {
        date: "28.08.2026",
        topic: "Debugging & Error Analysis",
        german: "die Protokolldatei",
        english: "Log file",
        plural: "Protokolldateien",
        example: "Die Protokolldatei enthält wichtige Informationen zur Fehlersuche."
    },


    // =========================
    // 29.08.2026
    // =========================

    {
        date: "29.08.2026",
        topic: "Debugging — Finding & Fixing Errors",
        german: "die Fehleranalyse",
        english: "Error analysis",
        plural: "Fehleranalysen",
        example: "Der Entwickler führt eine Fehleranalyse durch."
    },

    {
        date: "29.08.2026",
        topic: "Debugging — Finding & Fixing Errors",
        german: "die Fehlerbehebung",
        english: "Error fixing",
        plural: "Fehlerbehebungen",
        example: "Nach der Fehleranalyse beginnt die Fehlerbehebung."
    },

    {
        date: "29.08.2026",
        topic: "Debugging — Finding & Fixing Errors",
        german: "die Fehlerursache",
        english: "Cause of error",
        plural: "Fehlerursachen",
        example: "Der Entwickler sucht die Fehlerursache."
    },

    {
        date: "29.08.2026",
        topic: "Debugging — Finding & Fixing Errors",
        german: "reproduzieren",
        english: "to reproduce",
        plural: "-",
        example: "Der Entwickler versucht, den Fehler zu reproduzieren."
    },

    {
        date: "29.08.2026",
        topic: "Debugging — Finding & Fixing Errors",
        german: "nachverfolgen",
        english: "to trace / to track",
        plural: "-",
        example: "Der Entwickler kann den Fehler im Quellcode nachverfolgen."
    },


    // =========================
    // 30.08.2026
    // =========================

    {
        date: "30.08.2026",
        topic: "Debugging — Function Calls & Program Execution",
        german: "der Haltepunkt",
        english: "Breakpoint",
        plural: "Haltepunkte",
        example: "Der Entwickler setzt einen Haltepunkt im Quellcode."
    },

    {
        date: "30.08.2026",
        topic: "Debugging — Function Calls & Program Execution",
        german: "der Debugger",
        english: "Debugger",
        plural: "Debugger",
        example: "Der Entwickler verwendet den Debugger, um den Fehler zu finden."
    },

    {
        date: "30.08.2026",
        topic: "Debugging — Function Calls & Program Execution",
        german: "der Aufruf",
        english: "Call / Invocation",
        plural: "Aufrufe",
        example: "Der Aufruf der Funktion erfolgt nach der Initialisierung."
    },

    {
        date: "30.08.2026",
        topic: "Debugging — Function Calls & Program Execution",
        german: "der Funktionsaufruf",
        english: "Function call",
        plural: "Funktionsaufrufe",
        example: "Der Funktionsaufruf übergibt die Parameter an die Funktion."
    },

    {
        date: "30.08.2026",
        topic: "Debugging — Function Calls & Program Execution",
        german: "der Rückgabewert",
        english: "Return value",
        plural: "Rückgabewerte",
        example: "Der Rückgabewert der Funktion wird überprüft."
    }

];
fetch(CSV_URL)
    .then(response => response.text())
    .then(csv => {

        const rows = csv.split("\n").slice(1);

        const sheetVocabulary = rows
            .filter(row => row.trim() !== "")
            .map(row => {

                const columns = row.split(",");

                return {
                    date: columns[0]?.trim() || "",
                    topic: columns[1]?.trim() || "",
                    german: columns[2]?.trim() || "",
                    english: columns[3]?.trim() || "",
                    plural: columns[4]?.trim() || "",
                    example: columns.slice(5).join(",").trim() || ""
                };

            });

        vocabulary.push(...sheetVocabulary);

        console.log("Vocabulary loaded:", vocabulary);

    })
    .catch(error => {
        console.error("Could not load Google Sheet:", error);
    });
