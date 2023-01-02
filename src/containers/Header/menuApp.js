export const adminMenu = [
	{
		//Quản Lý Người Dùng
		name: "menu.admin.manage-user",
		menus: [
			{
				name: "menu.admin.crud",
				link: "/system/user-manage",
			},

			{
				name: "menu.admin.crud-redux",
				link: "/system/user-redux",
			},

			{
				name: "menu.admin.manage-doctor",
				link: "/system/manage-doctor",
				// subMenus:
				// [
				//   {name: "menu.system.system-administrator.user-manage", link: "/system/user-manage"},
				//   {name: "menu.system.system-administrator.user-redux", link: "/system/user-redux"},
				// ],
			},

			// {
			//   name: "menu.admin.manage-admin",
			//   link: "/system/user-admin",
			// },

			{
				//Doctor Manage Menu
				name: "menu.doctor.manage-schedule",
				link: "/doctor/manage-schedule",
			},
		],
	},
	{
		//Quản Lý Phòng Khám
		name: "menu.admin.clinic",
		menus: [
			{
				name: "menu.admin.manage-clinic",
				link: "/system/manage-clinic",
			},
		],
	},
	{
		//Quản Lý Chuyên Khoa
		name: "menu.admin.specialty",
		menus: [
			{
				name: "menu.admin.manage-specialty",
				link: "/system/manage-specialty",
			},
		],
	},
	{
		//Quản Lý Cẩm Nang
		name: "menu.admin.handbook",
		menus: [
			{
				name: "menu.admin.manage-handbook",
				link: "/system/manage-handbook",
			},
		],
	},
];

export const doctorMenu = [
	{
		//Doctor Manage Menu
		name: "menu.admin.manage-user",
		menus: [
			{
				name: "menu.doctor.manage-schedule",
				link: "/doctor/manage-schedule",
			},
			{
				name: "menu.doctor.manage-patient",
				link: "/doctor/manage-patient",
			},
		],
	},
];
