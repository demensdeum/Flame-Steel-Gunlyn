import subprocess
import shutil
import os

def deleteDirectory(dir):
    try:
        shutil.rmtree(dir)
    except Exception as e:
        print(e)

def copyFiles(from_dir, to_dir):
    shutil.copytree(from_dir, to_dir, dirs_exist_ok=True)

def runCommand(command):
    try:
        subprocess.run(command.split(), check=True, shell=True)
    except subprocess.CalledProcessError as e:
        print(f"An error occurred! Exit code: {e.returncode}")
        exit(e.returncode)

def run(rawCommands):
    commands = filter(lambda x: len(x) > 0, rawCommands.split("\n"))
    for command in commands:
        print(command)
        runCommand(command)

deleteDirectory("dist")

run("""
tsc
""")

copyFiles("resources", "dist")
copyFiles("build", "dist")

run("""
start cmd /k python D:\\Sources\\local-server-runner\\server.py
""")
