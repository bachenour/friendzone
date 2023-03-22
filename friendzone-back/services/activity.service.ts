import {AppDataSource} from "../src/data-source";
import {Activity} from "../src/entity/Activity";

class ActivityService{
    static async addActivity(newActivity: Activity) {
        try {
            const isActivityExist = await AppDataSource.manager.findOne(Activity, {where:
                    {subject: newActivity.subject, address: newActivity.address, city: newActivity.city, postal_code: newActivity.postal_code}});
            if (!isActivityExist) {
                await AppDataSource.manager.save(newActivity);
                return {newActivity, message: 'Activity added'};
            }else {
                return {error: 'Activity already exist'};
            }
        } catch (e) {
            return e;
        }
    }
    static async getActivities() {
        try {
            return await AppDataSource.manager.find(Activity);
        } catch (e) {
            return e;
        }
    }
    static async getActivitiesByUserId(userId: any) {
        try {
            if (userId == null) {
                return {error:"No Activity found with this user id"};
            }
            const ActivitiesData = await AppDataSource.manager.findBy(Activity, {users: userId});
            return ActivitiesData.length === 0 ? {error: 'Activity not found'} : ActivitiesData;
        } catch (e) {
            return e;
        }
    }
    static async updateActivity(id: any, activityData: Activity ) {
        try {
            await AppDataSource.manager.update(Activity, id, activityData);
            return activityData;
        } catch (e) {
            return e;
        }
    }

    static async deleteActivityById(activityId: any) {
        try {
            const activityToDelete = await AppDataSource.manager.findOne(Activity, {where: {id: activityId}});
            await AppDataSource.manager.remove(activityToDelete);
            return activityToDelete;
        } catch (e) {
            return e;
        }
    }

}
export default ActivityService;