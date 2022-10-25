class OS {
  constructor() {
    this.processes = { 0: [], 1: [] };
    this.files = [
      {
        name: "file0",
        content: "The quick brown fox jumps over the lazy dog.",
      },
      {
        name: "file1",
        content: "The five boxing wizards jump quickly.",
      },
      {
        name: "file2",
        content: "Pack my box with five dozen liquor jugs.",
      },
    ];
  }

  openFile(pID, fName) {
    if (!this.processes.hasOwnProperty(pID)) return;

    let fileIndx = null;
    this.files.forEach((file, indx) => {
      if (file.name === fName) {
        fileIndx = indx;
      }
    });

    if (fileIndx === null) return;

    const fileAlreadyOpen = this.processes[pID].find(
      (processFile) => processFile.name === fName
    );
    if (fileAlreadyOpen) return fileAlreadyOpen.fd;

    this.processes[pID].push({ name: fName, fd: fileIndx, cursor: 0 });
    return fileIndx;
  }

  readFile(pID, fd, count) {
    if (!this.processes.hasOwnProperty(pID)) return;

    let readContent = "";
    let fdExists = false;
    this.processes[pID].forEach((processFile, indx) => {
      if (processFile.fd === fd) {
        readContent = this.files[fd].content.substring(
          processFile.cursor,
          processFile.cursor + count
        );
        this.processes[pID][indx].cursor = processFile.cursor + count;
        fdExists = true;
      }
    });

    if (!fdExists) {
      console.log("No such open file");
      return;
    }

    return readContent;
  }

  seekFile(pID, fd, pos) {
    if (!this.processes.hasOwnProperty(pID)) return;

    let fdExists = false;
    this.processes[pID].forEach((processFile, indx) => {
      if (processFile.fd === fd) {
        this.processes[pID][indx].cursor = pos;
        fdExists = true;
      }
    });

    if (!fdExists) {
      console.log("No such open file");
    }
    return;
  }

  writeFile(pID, fd, content) {
    if (!this.processes.hasOwnProperty(pID)) return;

    let fdExists = false;
    this.processes[pID].forEach((processFile, indx) => {
      if (processFile.fd === fd) {
        this.files[fd].content = content;
        this.processes[pID][indx].cursor = 0;
        fdExists = true;
      }
    });

    if (!fdExists) {
      console.log("No such open file");
    }
    return;
  }
  closeFile(pID, fd) {
    if (!this.processes.hasOwnProperty(pID)) return;

    let fdIndx = null;
    this.processes[pID].forEach((processFile, indx) => {
      if (processFile.fd === fd) {
        fdIndx = indx;
      }
    });

    if (fdIndx !== null) {
      this.processes[pID].splice(fdIndx, 1);
    }
  }
}

module.exports = OS;
