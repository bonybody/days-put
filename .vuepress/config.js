module.exports = {
  "title": "DAYS PUT",
  "description": "日々得られる知識を整頓する技術系備忘録",
  "dest": "public",
  "head": [
    [
      "link",
      {
        "rel": "icon",
        "href": "/favicon.ico"
      }
    ],
    [
      "link",
      {
        "rel": "stylesheet",
        "href": "https://fonts.googleapis.com/css?family=Anton"
      }
    ],
    [
      "link",
      {
        "rel": "stylesheet",
        "href": "https://fonts.googleapis.com/css2?family=Kosugi+Maru&display=swap"
      }
    ],
    [
      "meta",
      {
        "name": "viewport",
        "content": "width=device-width,initial-scale=1,user-scalable=no"
      }
    ]
  ],
  "theme": "reco",
  "themeConfig": {
    "vssueConfig": {
      "platform": 'github',
      "owner": 'bonybody',
      "repo": 'DAYS-PUT',
      "clientId": '3c1c6993671e8a364333',
      "clientSecret": 'e9d57363bbb4d5c20ddfbc00ec3f3769f1c8ac92',
    },
    "nav": [
      {
        "text": "Home",
        "link": "/",
        "icon": "reco-home"
      },
      {
        "text": "TimeLine",
        "link": "/timeline/",
        "icon": "reco-date"
      },
      {
        "text": "Contact",
        "icon": "reco-message",
        "items": [
          {
            "text": "GitHub",
            "link": "https://github.com/bonybody",
            "icon": "reco-github"
          },
          {
            "text": "Twitter",
            "link": "https://twitter.com/bony_body",
            "icon": "reco-twitter"
          }
        ]
      }
    ],
    "type": "blog",
    "blogConfig": {
      "category": {
        "location": 2,
        "text": "Category"
      },
      "tag": {
        "location": 3,
        "text": "Tag"
      }
    },
    "friendLink": [
      {
        "title": "午后南杂",
        "desc": "Enjoy when you can, and endure when you must.",
        "email": "1156743527@qq.com",
        "link": "https://www.recoluan.com"
      },
      {
        "title": "vuepress-theme-reco",
        "desc": "A simple and beautiful vuepress Blog & Doc theme.",
        "avatar": "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
        "link": "https://vuepress-theme-reco.recoluan.com"
      }
    ],
    "logo": "/logo.png",
    "search": true,
    "searchMaxSuggestions": 10,
    "lastUpdated": "Last Updated",
    "author": "I.Y",
    "authorAvatar": "/avatar.png",
    "record": "xxxx",
    "startYear": "2020",
    "mode": "light",
    "modePicker": false
  },
  "markdown": {
    "lineNumbers": true
  },
  plugins: [
    '@vuepress/google-analytics',
    {
      'ga': ''
    }
  ]
}