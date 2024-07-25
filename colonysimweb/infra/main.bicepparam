using 'main.bicep'

param containerAppName = 'demoapp'
param containerAppsEnvironmentName = 'DemoAppEnvironment'
param containerRegistryName = 'ddecontainerreg01'
param imageName = 'https://ddecontainerreg01.azurecr.io/colonysimweb:latest'
param managedIdentityName = 'mi-ae-deploymentdemo'
