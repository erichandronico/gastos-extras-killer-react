#### Stations Groups (Clusters) desde FHO

```sql
SELECT 
    sc.[id],
    sc.[name],
    sc.[description],
    STUFF((SELECT ',' + CAST(scl.stn_id AS VARCHAR(20))
        FROM [HO_DATA].[dbo].[station_cluster_links] scl
        WHERE scl.cluster_id = sc.id
        FOR XML PATH('')), 1, 1, '[')+ ']' AS [stn_ids]
    FROM [HO_DATA].[dbo].[station_clusters] sc
```