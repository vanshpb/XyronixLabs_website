import os
import subprocess
import signal
from pathlib import Path
from django.core.management.base import BaseCommand

class Command(BaseCommand):
    help = 'Run both Django and React development servers'

    def handle(self, *args, **kwargs):
        react_process = None
        django_process = None
        processes_terminated = False

        def restart_process(command, cwd, process_name):
            try:
                self.stdout.write(self.style.WARNING(f'Restarting {process_name}...'))
                process = subprocess.Popen(command, cwd=cwd, shell=True)
                self.stdout.write(self.style.SUCCESS(f'{process_name} restarted.'))
                return process
            except Exception as e:
                self.stderr.write(self.style.ERROR(f'Failed to restart {process_name}: {e}'))
                return None

        def terminate_processes():
            nonlocal processes_terminated
            if not processes_terminated:
                if react_process:
                    self.stdout.write(self.style.WARNING('Terminating React development server...'))
                    react_process.terminate()
                if django_process:
                    self.stdout.write(self.style.WARNING('Terminating Django development server...'))
                    django_process.terminate()
                processes_terminated = True

        def signal_handler(sig, frame):
            self.stdout.write(self.style.WARNING('Received termination signal, shutting down servers...'))
            terminate_processes()
            exit(0)

        # Register signal handlers for graceful termination
        signal.signal(signal.SIGINT, signal_handler)
        signal.signal(signal.SIGTERM, signal_handler)

        try:
            # Define the path to the client directory
            client_path = Path(__file__).resolve().parent.parent.parent.parent.parent / 'client'
            self.stdout.write(self.style.SUCCESS(f'Client path: {client_path}'))

            # Define the path to the server directory
            server_path = Path(__file__).resolve().parent.parent.parent.parent.parent / 'server'
            self.stdout.write(self.style.SUCCESS(f'Server path: {server_path}'))

            # Define the path to the yarn executable
            yarn_path = 'C:\\Users\\adity\\AppData\\Roaming\\npm\\yarn.cmd'  # Update this path to the actual location of yarn.cmd on your system

            # Start the React development server using Vite
            self.stdout.write(self.style.SUCCESS('Starting React development server...'))
            react_process = subprocess.Popen([yarn_path, 'vite', '--host'], cwd=client_path, shell=True)
            self.stdout.write(self.style.SUCCESS('React development server started.'))

            # Start the Django development server
            self.stdout.write(self.style.SUCCESS('Starting Django development server...'))
            django_process = subprocess.Popen(['python', 'manage.py', 'runserver_plus', '--cert-file', 'cert.crt', '--key-file', 'cert.key'], cwd=server_path)
            self.stdout.write(self.style.SUCCESS('Django development server started.'))

            # Wait for both processes to complete
            while True:
                react_return_code = react_process.poll()
                django_return_code = django_process.poll()

                if react_return_code is not None:
                    self.stderr.write(self.style.ERROR('React development server failed.'))
                    react_process = restart_process([yarn_path, 'vite', '--host'], client_path, 'React development server')

                if django_return_code is not None:
                    self.stderr.write(self.style.ERROR('Django development server failed.'))
                    django_process = restart_process(['python', 'manage.py', 'runserver_plus', '--cert-file', 'cert.crt', '--key-file', 'cert.key'], server_path, 'Django development server')

                if react_return_code is None and django_return_code is None:
                    react_process.wait()
                    django_process.wait()
                    break

        except FileNotFoundError as fnf_error:
            self.stderr.write(self.style.ERROR(f'FileNotFoundError: {fnf_error}'))
        except subprocess.CalledProcessError as cpe:
            self.stderr.write(self.style.ERROR(f'CalledProcessError: {cpe}'))
        except Exception as e:
            self.stderr.write(self.style.ERROR(f'Error: {e}'))
        finally:
            # Ensure both processes are terminated
            terminate_processes()