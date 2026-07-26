public with sharing class AssetManagementService {

    //==============================================================
    // 1. Search Assets
    //==============================================================
    @AuraEnabled(cacheable=true)
    public static List<Company_Asset__c> searchAssets(String searchKey) {

        if (String.isBlank(searchKey)) {
            return new List<Company_Asset__c>();
        }

        String key = '%' + String.escapeSingleQuotes(searchKey.trim()) + '%';

        return [
            SELECT Id,
                   Name,
                   Asset_Number__c,
                   Brand__c,
                   Asset_Type__c,
                   Status__c
            FROM Company_Asset__c
            WHERE Name LIKE :key
               OR Asset_Number__c LIKE :key
            WITH USER_MODE
            ORDER BY Name
            LIMIT 100
        ];
    }

    //==============================================================
    // 2. Employee Dashboard
    //==============================================================
    @AuraEnabled(cacheable=true)
    public static EmployeeDashboardWrapper getEmployeeDashboardData(Id recordId) {

        EmployeeDashboardWrapper wrapper = new EmployeeDashboardWrapper();

        wrapper.assignedAssets = [
            SELECT Id,
                   Name,
                   Asset_Number__c,
                   Brand__c,
                   Asset_Type__c,
                   Status__c
            FROM Company_Asset__c
            WHERE Assigned_To__c = :recordId
            WITH USER_MODE
        ];

        Set<Id> assetIds = new Map<Id, Company_Asset__c>(wrapper.assignedAssets).keySet();

        if (!assetIds.isEmpty()) {

            wrapper.maintenanceRequests = [
                SELECT Id,
                       Name,
                       Company_Asset__c,
                       Company_Asset__r.Name,
                       Priority__c,
                       Status__c
                FROM Maintenance_Request__c
                WHERE Company_Asset__c IN :assetIds
                AND Status__c != 'Closed'
                WITH USER_MODE
            ];

        } else {

            wrapper.maintenanceRequests = new List<Maintenance_Request__c>();

        }

        return wrapper;
    }

    //==============================================================
    // 3. Available Assets
    //==============================================================
    @AuraEnabled(cacheable=true)
    public static List<Company_Asset__c> getAvailableAssets() {

        return [
            SELECT Id,
                   Name,
                   Asset_Number__c,
                   Brand__c,
                   Asset_Type__c,
                   Status__c
            FROM Company_Asset__c
            WHERE Status__c = 'Available'
            WITH USER_MODE
            ORDER BY Name
        ];
    }

    //==============================================================
    // 4. Assign Asset
    //==============================================================
    @AuraEnabled
    public static void assignAssetToEmployee(Id assetId, Id employeeId) {

        if (assetId == null || employeeId == null) {
            throw new AuraHandledException('Asset ID and Employee ID are required.');
        }

        Company_Asset__c asset = new Company_Asset__c(
            Id = assetId,
            Assigned_To__c = employeeId,
            Status__c = 'Assigned'
        );

        update asset;
    }

    //==============================================================
    // 5. Dashboard Statistics
    //==============================================================
    @AuraEnabled(cacheable=true)
    public static Map<String, Integer> getDashboardStatistics() {

        Map<String, Integer> dashboard = new Map<String, Integer>();

        dashboard.put(
            'totalEmployees',
            [SELECT COUNT() FROM Employee__c]
        );

        dashboard.put(
            'totalAssets',
            [SELECT COUNT() FROM Company_Asset__c]
        );

        dashboard.put(
            'availableAssets',
            [
                SELECT COUNT()
                FROM Company_Asset__c
                WHERE Status__c = 'Available'
            ]
        );

        dashboard.put(
            'assignedAssets',
            [
                SELECT COUNT()
                FROM Company_Asset__c
                WHERE Status__c = 'Assigned'
            ]
        );

        dashboard.put(
            'repairAssets',
            [
                SELECT COUNT()
                FROM Company_Asset__c
                WHERE Status__c = 'Repair'
            ]
        );

        dashboard.put(
            'openRequests',
            [
                SELECT COUNT()
                FROM Maintenance_Request__c
                WHERE Status__c = 'Open'
            ]
        );

        return dashboard;
    }

    //==============================================================
    // 6. Get All Assets (Asset Data Table)
    //==============================================================
    @AuraEnabled(cacheable=true)
    public static List<Company_Asset__c> getAllAssets() {

        return [
            SELECT Id,
                   Name,
                   Asset_Number__c,
                   Brand__c,
                   Asset_Type__c,
                   Status__c,
                   Assigned_To__c,
                   Assigned_To__r.Name
            FROM Company_Asset__c
            WITH USER_MODE
            ORDER BY Name
        ];
    }

    //==============================================================
    // Wrapper Class
    //==============================================================
    public class EmployeeDashboardWrapper {

        @AuraEnabled
        public List<Company_Asset__c> assignedAssets;

        @AuraEnabled
        public List<Maintenance_Request__c> maintenanceRequests;
    }
}