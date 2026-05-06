import * as Joi from 'joi';

// ==========================================
// 1. HELPER SCHEMAS (For reusability)
// ==========================================

const planDetailsSchema = Joi.object({
    id: Joi.string().allow('', null),
    name: Joi.string().allow('', null),
    description: Joi.string().allow('', null),
    benefits: Joi.array().items(Joi.string()).allow(null),
    fee: Joi.number().required(),
    max_channels: Joi.number().required(),
    max_users: Joi.number().required(),
    max_notifications: Joi.number().required(),
    can_upgrade_notifications: Joi.boolean().required(),
    can_add_unlimited_channels: Joi.boolean().required(),
    can_add_unlimited_users: Joi.boolean().required(),
    is_for_individuals: Joi.boolean().required(),
    is_for_small_business: Joi.boolean().required(),
    is_for_large_enterprise: Joi.boolean().required(),
    unlimited_ai_co_workers: Joi.boolean().required(),
    create_your_own_ai_co_workers: Joi.boolean().required(),
    ai_credits_purchasable: Joi.boolean().required(),
    max_call_duration: Joi.number().required(),
    max_buzz_participants: Joi.number().required(),
    max_active_calls: Joi.number().required(),
    call_records_available: Joi.boolean().required(),
    transcript_available: Joi.boolean().required(),
    advanced_controls: Joi.boolean().required(),
    advanced_controls_user: Joi.boolean().required(),
    created_at: Joi.string().isoDate().required(),
    credits: Joi.number().required(),
    updated_at: Joi.string().isoDate().required()
});

const userRoleSchema = Joi.object({
    role_id: Joi.string().allow('', null),
    role_name: Joi.string().allow('', null),
    permissions: Joi.array().items(Joi.string()).optional()
});

const permissionsListSchema = Joi.object({
    can_remove_people_from_organization: Joi.boolean().required(),
    can_invite_members: Joi.boolean().required(),
    can_create_custom_role: Joi.boolean().required(),
    can_create_channel: Joi.boolean().required(),
    can_comment_on_threads: Joi.boolean().required(),
    can_view_billing: Joi.boolean().required(),
    can_create_webhooks: Joi.boolean().required(),
    can_view_channels: Joi.boolean().required(),
    can_change_user_org_role: Joi.boolean().required(),
    can_delete_any_file: Joi.boolean().required(),
    can_manage_general_invite_link: Joi.boolean().required()
});

const userProfileSubSchema = Joi.object({
    profile_id: Joi.string().allow('', null),
    first_name: Joi.string().allow('', null),
    last_name: Joi.string().allow('', null),
    full_name: Joi.string().allow('', null),
    username: Joi.string().allow('', null),
    phone: Joi.string().allow('', null),
    avatar_url: Joi.string().allow('', null),
    user_id: Joi.string().allow('', null),
    created_at: Joi.string().required(), // Deliberately generic string, sometimes 0001-01-01
    updated_at: Joi.string().required(),
    display_name: Joi.string().allow('', null),
    title: Joi.string().allow('', null),
    name_pronunciation: Joi.string().allow('', null),
    timezone: Joi.string().allow('', null),
    icon: Joi.string().allow('', null),
    text: Joi.string().allow('', null),
    pause_notification: Joi.boolean().required(),
    status_timeout: Joi.string().allow('', null),
    status_visibility: Joi.string().allow('', null),
    workspace_id: Joi.string().allow('', null),
    track: Joi.string().allow('', null),
    links: Joi.any().allow(null),
    online: Joi.boolean().required(),
    is_active: Joi.boolean().required()
});


// ==========================================
// 2. ORGANISATION SCHEMAS
// ==========================================

export const organisationDataSchema = Joi.object({
    id: Joi.string().uuid().required(),
    name: Joi.string().required(),
    description: Joi.string().allow('', null),
    email: Joi.string().email().required(),
    type: Joi.string().required(),
    location: Joi.string().allow('', null),
    country: Joi.string().allow('', null),
    owner_id: Joi.string().uuid().required(),
    logo_url: Joi.string().allow('', null),
    credit_balance: Joi.number().required(),
    channels_count: Joi.number().integer().required(),
    total_messages_count: Joi.number().integer().required(),
    org_roles: Joi.array().allow(null),
    pinned: Joi.boolean().required(),
    Users: Joi.any().allow(null),
    created_at: Joi.string().isoDate().required(),
    updated_at: Joi.string().isoDate().required(),
    channels: Joi.any().allow(null),
    subscription_plan_id: Joi.string().required(),
    stripe_customer_id: Joi.string().allow('', null),
    org_plan_id: Joi.string().uuid().required(),
    organisation_plan: Joi.object({
        started_at: Joi.string().required(),
        ended_at: Joi.string().required(),
        created_at: Joi.string().required(),
        updated_at: Joi.string().required(),
        plan_details: planDetailsSchema.required()
    }).required(),
    organisation_slug: Joi.string().allow('', null),
    user_role: userRoleSchema.required(),
    invite_link_status: Joi.string().optional()
});

export const organisationResponseSchema = Joi.object({
    status: Joi.string().required(),
    status_code: Joi.number().valid(200, 201).required(),
    message: Joi.string().required(),
    data: organisationDataSchema.required()
});


// ==========================================
// 3. AUTH / LOGIN SCHEMA
// ==========================================

export const userLoginSchema = Joi.object({
    status: Joi.string().required(),
    status_code: Joi.number().valid(200).required(),
    message: Joi.string().required(),
    data: Joi.object({
        access_token: Joi.string().required(),
        access_token_expires_in: Joi.string().required(),
        notification_token: Joi.string().allow('', null),
        user: Joi.object({
            avatar_url: Joi.string().allow('', null),
            created_at: Joi.string().required(),
            current_org: Joi.string().uuid().required(),
            current_organisation_slug: Joi.string().allow('', null),
            default_avatar_url: Joi.string().required(),
            email: Joi.string().email().required(),
            expires_in: Joi.string().required(),
            first_name: Joi.string().required(),
            fullname: Joi.string().required(),
            id: Joi.string().uuid().required(),
            is_active: Joi.boolean().required(),
            is_onboarded: Joi.boolean().required(),
            is_verified: Joi.boolean().required(),
            last_name: Joi.string().required(),
            online: Joi.boolean().required(),
            organisation: organisationDataSchema.required(), // REUSING ORG SCHEMA!
            phone: Joi.string().allow('', null),
            profile_updated: Joi.boolean().required(),
            updated_at: Joi.string().required(),
            user_id: Joi.string().uuid().required(),
            username: Joi.string().allow('', null)
        }).required()
    }).required()
});

export const errorSchema = Joi.object({
    status: Joi.string().optional(),
    status_code: Joi.number().required(),
    message: Joi.string().required()
}).unknown(true); // .unknown(true) allows extra fields like 'data: null' or 'error: [...]' to exist without failing

// ==========================================
// 4. USERS & PROFILE SCHEMAS
// ==========================================

export const userProfileResponseSchema = Joi.object({
    status: Joi.string().required(),
    status_code: Joi.number().valid(200).required(),
    message: Joi.string().required(),
    data: Joi.object({
        id: Joi.string().uuid().optional(),
        email: Joi.string().email().allow('', null).optional(),
        phone: Joi.string().allow('', null).optional(),
        
        // 🚨 Changed to optional because Zedu omits them 🚨
        first_name: Joi.string().allow('', null).optional(),
        last_name: Joi.string().allow('', null).optional(),
        full_name: Joi.string().allow('', null).optional(),
        username: Joi.string().allow('', null).optional(),
        
        avatar_url: Joi.string().allow('', null).optional(),
        default_avatar_url: Joi.string().allow('', null).optional(),
        
        // Assuming user_id is the one thing they ALWAYS return
        user_id: Joi.string().uuid().required(), 
        
        deactivated: Joi.boolean().optional(),
        created_at: Joi.string().required(),
        updated_at: Joi.string().required(),
        deleted_at: Joi.string().allow('', null).optional(),
        profile_updated: Joi.boolean().optional(),
        is_onboarded: Joi.boolean().optional(),
        display_name: Joi.string().allow('', null).optional(),
        title: Joi.string().allow('', null).optional(),
        name_pronounciation: Joi.string().allow('', null).optional(),
        timezone: Joi.string().allow('', null).optional(),
        icon: Joi.string().allow('', null).optional(),
        text: Joi.string().allow('', null).optional(),
        pause_notification: Joi.boolean().optional(),
        status_timeout: Joi.string().allow('', null).optional(),
        workspace_id: Joi.string().allow('', null).optional(),
        track: Joi.string().allow('', null).optional(),
        links: Joi.any().allow(null).optional(),
        online: Joi.boolean().optional()
    }).required().unknown(true) 
});

export const allUsersListSchema = Joi.object({
    status: Joi.string().required(),
    status_code: Joi.number().valid(200).required(),
    message: Joi.string().required(),
    data: Joi.array().items(
        Joi.object({
            id: Joi.string().uuid().required(),
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            is_verified: Joi.boolean().required(),
            deactivated: Joi.boolean().required(),
            is_active: Joi.boolean().required(),
            is_onboarded: Joi.boolean().required(),
            profile_updated: Joi.boolean().required(),
            current_org: Joi.string().uuid().required(),
            onesignal_subscription_id: Joi.string().allow('', null),
            profile: userProfileSubSchema.required(),
            channels: Joi.any().allow(null),
            organisations: Joi.any().allow(null),
            org_role_id: Joi.any().allow(null),
            user_role_id: Joi.any().allow(null),
            org_role: Joi.object({
                id: Joi.string().allow('', null),
                name: Joi.string().allow('', null),
                description: Joi.string().allow('', null),
                organisation_id: Joi.any().allow(null),
                is_default: Joi.boolean().required(),
                permissions: Joi.object({
                    id: Joi.string().allow('', null),
                    role_id: Joi.string().allow('', null),
                    permission_list: permissionsListSchema.required(),
                    is_default: Joi.boolean().required()
                }).required()
            }).required(),
            created_at: Joi.string().isoDate().required(),
            updated_at: Joi.string().isoDate().required(),
            last_log_in_at: Joi.string().isoDate().allow(null),
            last_activity_at: Joi.string().isoDate().allow(null),
            role: Joi.number().integer().required()
        })
    ).required(),
    pagination: Joi.object({
        current_page: Joi.number().integer().required(),
        page_count: Joi.number().integer().required(),
        total_pages_count: Joi.number().integer().required(),
        total_items: Joi.number().integer().required()
    }).required()
});