@description('Azure Container Apps Environment Name')
param containerAppsEnvironmentName string

@description('Azure Container App Name')
param containerAppName string

@description('Azure Container Registry Name')
param containerRegistryName string

@description('Managed Identity Name')
param managedIdentityName string

@description('Image Name')
param imageName string = 'nginx'

resource managedIdentity 'Microsoft.ManagedIdentity/userAssignedIdentities@2023-01-31' existing = {
  name: managedIdentityName
}

resource containerRegistry 'Microsoft.ContainerRegistry/registries@2023-07-01' = {
  name: containerRegistryName
  location: resourceGroup().location
  sku: {
    name: 'Basic'
  }
}

resource logAnalyticsWorkspace 'Microsoft.OperationalInsights/workspaces@2023-09-01' = {
  name: 'logAnalyticsWorkspace'
  location: resourceGroup().location
  properties: {
    sku: {
      name: 'PerGB2018'
    }
  }
}

resource environment 'Microsoft.App/managedEnvironments@2024-03-01' = {
  name: containerAppsEnvironmentName
  location: resourceGroup().location
  properties: {
    appLogsConfiguration: {
      destination: 'log-analytics'
      logAnalyticsConfiguration: {
        customerId: logAnalyticsWorkspace.properties.customerId
        sharedKey: logAnalyticsWorkspace.listKeys().primarySharedKey
      }
    }
  }
}

resource containerApp 'Microsoft.App/containerApps@2024-03-01' = {
  name: containerAppName
  location: resourceGroup().location
  properties: {
    managedEnvironmentId: environment.id
    configuration: {
      ingress: {
        targetPort: 80
        external: true
      }
    }
    template: {
      containers: [
        {
          name: containerAppName
          image: imageName
        }
      ]
    }
  }
  identity: {
    type: 'UserAssigned'
    userAssignedIdentities: {
      '${managedIdentity.id}': {}
    }
  }
}

output containerAppUrl string = containerApp.properties.latestRevisionFqdn
output environmentId string = environment.id
