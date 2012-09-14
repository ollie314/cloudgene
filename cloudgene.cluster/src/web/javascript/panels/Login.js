Ext.onReady(function(){
    Ext.QuickTips.init();
    
    
    String.prototype.startsWith = function(prefix) {
        return this.indexOf(prefix) === 0;
    }

    
    // Create a variable to hold our EXT Form Panel. 
    // Assign various config options as seen.	 
    var login = new Ext.FormPanel({
        labelWidth: 80,
        url: '../checkLogin',
        frame: true,
        title: 'Please Login',
        defaultType: 'textfield',
        monitorValid: true,
        // Specific attributes for the text fields for username / password. 
        // The "name" attribute defines the name of variables sent to the server.
        items:[{ 
        		value: 'cloudgene',
                fieldLabel:'Username', 
                name:'loginUsername', 
                allowBlank:false 
            },{ 
            	value: 'cloud',
                fieldLabel:'Password', 
                name:'loginPassword', 
                inputType:'password', 
                allowBlank:false 
            }],
        
        // All the magic happens after the user clicks the button     
        buttons: [{
            text: 'Login',
            formBind: true,
            // Function that fires when user clicks the button 
            handler: function(){
                login.getForm().submit({
                    method: 'POST',
                    waitTitle: 'Connecting',
                    waitMsg: 'Validating data...',
                    
                    success: function(form, action){
                        var obj = Ext.util.JSON.decode(action.response.responseText);
                        if (obj.success) {
                        	var redirect=Ext.util.Cookies.get("forwardFrom");
                        	if(redirect!=null){
                        	if(redirect.startsWith("/destroy.html")){
                            redirect = Ext.util.Cookies.get("forwardFrom");}
                        	}
                        	else{
                        	redirect = 'cloudgene.html';}
                        	  window.location = redirect;
                        }
                        else {
                            Ext.Msg.alert('Login Failed', obj.message);
                            login.getForm().reset();
                        }
                        
                    },
                    
                    failure: function(form, action){
                        var obj = Ext.util.JSON.decode(action.response.responseText);
                        Ext.Msg.alert('Login Failed', obj.message);
                        login.getForm().reset();
                    }
                });
            }
        }],
        keys: [{
            key: [Ext.EventObject.ENTER],
            handler: function(){
            
                login.getForm().submit({
                    method: 'POST',
                    waitTitle: 'Connecting',
                    waitMsg: 'Validating data...',
                    
                    success: function(form, action){
                        var obj = Ext.util.JSON.decode(action.response.responseText);
                        if (obj.success) {
                        
                            var redirect = 'cloudgene.html';
                            window.location = redirect;
                        }
                        else {
                            Ext.Msg.alert('Login Failed', obj.message);
                            login.getForm().reset();
                        }
                        
                    },
                    
                    failure: function(form, action){
                        var obj = Ext.util.JSON.decode(action.response.responseText);
                        Ext.Msg.alert('Login Failed', obj.message);
                        login.getForm().reset();
                    }
                });
                
                
            }
        }]
    });
    
    
    // This just creates a window to wrap the login form. 
    // The login object is passed to the items collection.       
    var win = new Ext.Window({
        layout: 'fit',
        width: 300,
        height: 150,
        closable: false,
        resizable: false,
        plain: true,
        border: false,
        items: [login]
    });
    win.show();
	
});
