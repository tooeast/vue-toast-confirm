## vue-toast-confirm


> A simple dialog plugin that supports both dialog and toast modes, with customizable types and button texts, etc.

### ```this.$toast()```

```javascript

this.$toast({
  type: 'error',
  msg: 'hahahaha',
  duration: 3000
})

```

### ```this.$side()```

```javascript

this.$side({
  type: 'error',
  msg: 'hahahaha',
  duration: 3000
})

```

### ```this.$confirm()```

```javascript

this.$confirm({
  type: 'error',
  title: 'This is title',
  content: 'This is the message area!',
  confirmText: 'ok',
  cancelText: 'no',
  confirm: () => {
    console.log('Your callback')
    this.$close()  //If you don't want to close the dialog, you can not use it.
  },
  cancel: () => {
    console.log('Your callback')
    this.$close()  //If you don't want to close the dialog, you can not use it.
  }
})

```

type | toast | confirm | side
---|---|---|---
 (null)| | ![alt](https://sansiro.me/upload/0685345cbb629464a721507a5349a0c6-WX20181010-170745.png) |
error |  ![alt](https://sansiro.me/upload/050f93b8f65c250943796ae791a98d4e-WX20181010-165254.png) | ![alt](https://sansiro.me/upload/95155c3b40ba66331437be905ffb5ac5-WX20181010-170731.png) | ![alt](https://sansiro.me/upload/0fe9dad5526008cf09b1a862786ce214-wx11.png)
success | ![alt](https://sansiro.me/upload/68334f9036750bb60734f62829b985bd-WX20181010-165235.png) | ![alt](https://sansiro.me/upload/5cf0d204ee56831ddfee7ab5996b60dc-WX20181010-165113.png) | ![alt](https://sansiro.me/upload/a76d945836244ab8e21d78df93ce25b8-wx22.png)
warnning | ![alt](https://sansiro.me/upload/26d92cda7bc24f233326719720c7f0bf-WX20181010-165207.png) | ![alt](https://sansiro.me/upload/229d89301fae3e793b82f015a9e12ab2-WX20181010-165015.png) | ![alt](https://sansiro.me/upload/9cb792884b57e17933e96bf47226dd0f-WX20181011-184654.png)


