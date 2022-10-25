const OS = require("./os.js");


function quickOSTesting() {
    const os = new OS();
    const fd0 = os.openFile(0, "file0");
    const fd1 = os.openFile(1, "file1");
    const fd2 = os.openFile(0, "file2");
  
    let fd0Content = os.readFile(0, fd0, 5);
    fd0Content === "The q"
      ? console.log("Passed 1!")
      : console.log("Boo-hoo Failed 1!");
  
    fd0Content = os.readFile(0, fd0, 4);
    fd0Content === "uick"
      ? console.log("Passed 2!")
      : console.log("Boo-hoo Failed 2!");
  
    os.seekFile(0, fd0, 0);
    fd0Content = os.readFile(0, fd0, 2);
  
    fd0Content === "Th"
      ? console.log("Passed 3!")
      : console.log("Boo-hoo Failed 3!");
  
    os.seekFile(1, fd1, 4);
    let fd1Content = os.readFile(1, fd1, 19);
    fd1Content === "five boxing wizards"
      ? console.log("Passed 4!")
      : console.log("Boo-hoo Failed 4!");
  
    os.writeFile(0, fd2, "Sphinx of black quartz, judge my vow.");
    let fd2Content = os.readFile(0, fd2, 6);
    fd2Content === "Sphinx"
      ? console.log("Passed 5!")
      : console.log("Boo-hoo Failed 5!");
  
    os.closeFile(0, fd0);
    os.closeFile(1, fd1);
    os.closeFile(0, fd2);
  
    !os.processes["0"].length && !os.processes["0"].length
      ? console.log("Passed 6!")
      : console.log("Boo-hoo Failed 6!");
  }
  
  quickOSTesting();
  